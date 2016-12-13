import React from 'react';
import { RouteTransition } from 'react-router-transition';


export default class App extends React.Component {
    render() {
        let children = this.props.children;
        return (
                                <RouteTransition
                                    pathname={this.props.location.pathname}
                                    atEnter={{ opacity: 0 , scale: 0.8 }}
                                    atLeave={{ opacity: 0  , scale: 0.8 }}
                                    atActive={{ opacity: 1 , scale: 1 }}
                                    mapStyles={styles => ({ opacity: styles.opacity,transform: `scale(${styles.scale})` })}
                                >
                                    {children}
                                </RouteTransition>


        )
    }
}