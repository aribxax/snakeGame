import * as React from 'react';
import { SafeAreaView, StyleSheet, View, Button, Pressable, Text} from 'react-native';
import { Colors } from '../styles/colors';
import { PanGestureHandler } from "react-native-gesture-handler";
import { Coordinate, GestureEventType } from '../types/types';
import { Direction } from '../types/types';
import Snake from './Snake';
import { checkGameOver } from '../utils/dist/checkGameOver';
import Food from './Food';
import { checkEatsFood } from '../utils/dist/checkEatsFood';
import { randomFoodPosition } from '../utils/dist/randomFoodPosition';
import Header from './Header';

const SNAKE_INITIAL_POSITION = [{x:5, y:5}];
const FOOD_INITIAL_POSITION = {x:5, y:20};
const GAME_BOUNDS = { xMin: 0, xMax: 34, yMin: 0, yMax: 63 };
const MOVE_INTERVAL = 50;   
const SCORE_INCREMENT = 10;






export default function Game():JSX.Element {

    const [direction, setDirection] = React.useState<Direction>(Direction.Right);

    const [snake, setSnake ] = React.useState<Coordinate[]>(SNAKE_INITIAL_POSITION); // added a bracket here to allow an array to be passed, otherwise error
    
    const [food, setFood ] = React.useState<Coordinate>(FOOD_INITIAL_POSITION);

    const [isGameOver, setIsGameOver] = React.useState<boolean>(false);
    const [isPaused, setIsPaused] = React.useState<boolean>(false);
    const [score, setScore] = React.useState<number>(0);

    React.useEffect(() => {
        if(!isGameOver) {
            const intervalId = setInterval(() => {
                !isPaused && moveSnake();
            }, MOVE_INTERVAL)
            return () => clearInterval(intervalId);
        }
    }, [snake, isGameOver, isPaused]);

    const moveSnake = () => {
        const snakeHead = snake[0];
        const newHead = { ...snakeHead} //copy of snakehead

        //game over
        if(checkGameOver(snakeHead, GAME_BOUNDS)){
            setIsGameOver((prev) => !prev);
            /* setSnake(SNAKE_INITIAL_POSITION) */ // my edit to play infinetly
            setIsGameOver((prev) => !prev);
            return;
        }

        switch (direction) {
            case Direction.Up:
                newHead.y -= 1;
                break;
            case Direction.Down:
                newHead.y += 1;
                break;
            case Direction.Left:
                newHead.x -= 1;
                break;
            case Direction.Right:
                newHead.x += 1;
                break;
            default:
                break;
        }
        //if eats food 
        //snake grows
        if(checkEatsFood(newHead, food, 2)){
            setFood(randomFoodPosition(GAME_BOUNDS.xMax, GAME_BOUNDS.yMax))
            setSnake([newHead, ...snake]);
            //get another position for the food
            
            setScore(score + SCORE_INCREMENT);
        }else{
            setSnake([newHead, ...snake.slice(0, -1)]);
        }
 //take out slice to draw
    };

    const handleGesture = (event: GestureEventType) => {
        const { translationX, translationY } = event.nativeEvent;

        if (Math.abs(translationX) > Math.abs(translationY)){
            if (translationX > 0){
                //moving right
                setDirection(Direction.Right)
        }else{
            //moving left
            setDirection(Direction.Left)
        }
     } else {
        if(translationY > 0){
            //moving down
            setDirection(Direction.Down)

        }else{
            //moving up
            setDirection(Direction.Up)
        }
     }
    };
    
    const restartGame = () => {
        setSnake(SNAKE_INITIAL_POSITION);
        setFood(FOOD_INITIAL_POSITION);
        setIsGameOver(false);
        setScore(0);
        setDirection(Direction.Right);
        setIsPaused(false);
    };
    const pauseGame = () => {
        setIsPaused(!isPaused);
    }

    return (
        <PanGestureHandler onGestureEvent={handleGesture}>
            
                <SafeAreaView style={styles.container}>
                    <Header restartGame={restartGame} pauseGame={pauseGame} isPaused={isPaused}> 
                    <Text>{score}</Text> 
                    </Header>
                    <View style={styles.boundaries}>
                        <Snake snake={snake} />
                        <Food x={food.x} y={food.y}/>
                    </View>
                </SafeAreaView>
        </PanGestureHandler>
    )
}


const styles = StyleSheet.create({
    container: {
        flex:1,
        backgroundColor: Colors.primary,
    },
    boundaries: {
        flex: 1,
        borderColor:Colors.primary,
        borderWidth: 12,
  /*       borderBottomLeftRadius: 30,
        borderBottomRightRadius: 30, */
        backgroundColor: Colors.background,
    },
    buttons: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        padding: 20,
        },
});


