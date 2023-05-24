import * as React from 'react';
import { Button, Text, Pressable, StyleSheet, SafeAreaView, View} from 'react-native';


interface HeaderProps {
    restartGame: () => void;
    pauseGame: () => void;
    children: JSX.Element;
    isPaused: boolean;
}

export default function Header({children, restartGame, pauseGame, isPaused}: HeaderProps): JSX.Element {




    return(
        <SafeAreaView style={styles.container}>
        <Pressable style={styles.button} onPress={restartGame}>
            <Text>Restart</Text>
        </Pressable>
        <View>Score {children}</View>
        <Pressable style={styles.button} onPress={pauseGame}>
            <Text>{isPaused ? '⏵' : `⏸` }</Text>
        
        </Pressable>

        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container:{
        display:'flex',
        flexDirection:'row',
        justifyContent:'space-around',
        marginTop:'10px'
    },
    button:{
        height:'max-content',
        width: 'max-content',
        padding:'5px',
        backgroundColor:'grey',
        
    }
})