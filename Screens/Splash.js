import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Image } from 'react-native'; 
import logo from '../assets/logo1.png'; 
import LottieView from 'lottie-react-native'; 

export default function Splash({ setIsLoading }) { 
    const [showLottie, setShowLottie] = useState(true); 

    useEffect(() => { 
        const timer = setTimeout(() => { setShowLottie(false); setIsLoading(false) }, 2000); 
        return () => clearTimeout(timer); // Cleanup the timer if the component unmounts
    }, [setIsLoading]); 
    
    // Log any errors with the LottieView component 
    const handleLottieError = (error) => { console.error('Lottie Error:', error); }; 
    
    return ( 
    <View style={styles.container}>
         {showLottie ? ( 
            <Image source={logo} style={styles.logo} /> ) : ( 
            <LottieView autoPlay source={require('../assets/loader.json')} loop={false} resizeMode='cover' style={styles.lottie} onAnimationFinish={() => setIsLoading(false)} />
        )} 
    </View> 
    ); 
} 
            
            
const styles = StyleSheet.create({ 
    container: { 
        flex: 1, 
        margin:0, 
        alignItems: 'center', 
        justifyContent: 'center', 
        zIndex:10000 }, 
    logo: { 
        width: 240, 
        height: 240, }, 
    lottie: { 
        width: '100%', 
        height: '100%', 
    }, 
});
