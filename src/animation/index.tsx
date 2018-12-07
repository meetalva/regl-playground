import * as React from "react";
import * as REGL from 'regl';

const fragmentShader: string = `
precision mediump float;

uniform float time;
uniform float width;
uniform float height;

uniform float scaling;

void main () {
  
  vec2 p0 = vec2(gl_FragCoord) * scaling;
  float a = time * .05;
  vec2 p = vec2(p0.x * cos(a) - p0.y * sin(a),
                p0.x * sin(a) + p0.y * cos(a));
  vec3 c = vec3(.5 + sin(p.x * 2.0 + time * .1) * .5, .5 + sin(p.y * 2.0 + time * .01 + .5) * .5, .5 + sin(time * .003 + 1.2) * .5);
  
  vec3 color = (c * 
                sin(time + sin(p.x *.025)) * 
                sin(time + sin(p.y *.025) ));
  gl_FragColor = vec4(vec3(color), 1.0);
}
`
const vertexShader: string = `
precision mediump float;
attribute vec2 position;

void main () {
  gl_Position = vec4(position, 0, 1);
} 

`

export interface AnimationProps {
    /** @default 1.0 */
    scaling: number;
}


export class Animation extends React.Component<AnimationProps> {

    canvas: HTMLCanvasElement | null
    regl: REGL.Regl
    width: number
    height: number
    canvasRef = React.createRef<HTMLCanvasElement>()

    setSize = () => {
        const { canvas } = this
        if (canvas) {
            canvas.width = this.width = canvas.clientWidth
            canvas.height = this.height = canvas.clientHeight
        }

    }

    componentDidMount() {
        this.canvas = this.canvasRef.current
        if (this.canvas) {
            this.setSize()
            window.addEventListener('resize', this.setSize)
            this.regl = REGL({ canvas: this.canvas })
            const { regl } = this
            const drawFrame = regl({
                frag: fragmentShader,
                vert: vertexShader,
                attributes: {
                    position: [[-1, -1], [-1, 1], [1, -1], /* triangle 1 */
                    [1, -1], [-1, 1], [1, 1]] /* triangle 2 */
                },
                uniforms: {
                    scaling: (ctx : REGL.DefaultContext) => {
                        // console.log(typeof this.props.scaling)
                        
                        return parseFloat(this.props.scaling.toString())
                    },
                    width: (ctx : REGL.DefaultContext) => ctx.viewportWidth,
                    height: (ctx : REGL.DefaultContext) => ctx.viewportHeight,
                    time: (ctx : REGL.DefaultContext) => ctx.tick * 2e-2
                },
                count: 6
            })
            regl.frame(ctx => {
                regl.clear({ depth: 1 })
                drawFrame()
            })
        }

    }

    componentWillUnmount() {
        this.regl.destroy()
        window.removeEventListener('resize', this.setSize)
    }

    render() {
        return <div><canvas
            ref={this.canvasRef}
            style={{ display: 'block', width: '100%', height: '100%' }}>
        </canvas><pre>{this.props.scaling}</pre></div>
    }
}
