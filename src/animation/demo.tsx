import * as React from 'react'
import { Animation } from './index'

const AnimationDemo : React.StatelessComponent<void> = () : JSX.Element => <div>
    <Animation scaling={0.0} />

    <Animation scaling={1.0} />

    <Animation scaling={20.0} />
</div>

export default AnimationDemo