import { Coordinate } from "../types/types";
import { Fragment } from 'react';
import { View } from 'react-native';
import { Colors } from "../styles/dist/colors";
import { StyleSheet } from 'react-native'
interface SnakeProps {
    snake: Coordinate[];
}


export default function Snake ({snake}:SnakeProps):JSX.Element {
    return(
        <Fragment>
            {snake.map((segment:Coordinate, index:number) => {
                const segmentStyle = {
                    left: segment.x * 10,
                    top: segment.y * 10,
                };
                return <View key={index} style={[styles.snake, segmentStyle]}/>
            })}
        </Fragment>
    )
}

const styles = StyleSheet.create({
    snake: {
        width: 15,
        height:15,
        borderRadius: 0,
        backgroundColor:'black',
        position:'absolute',
    }
})