import React from "react";
import {View, Text, StyleSheet, Image, Linking,TouchableWithoutFeedback} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";

const steam = <Icon name={'steam'} size={35} color={'black'}/>
const telegram = <Icon name={'telegram'} size={35} color={'black'}/>
const twitch = <Icon name={'twitch'} size={35} color={'black'}/>
const linkedin = <Icon name={'linkedin'} size={35} color={'black'}/>
const kwai = <Icon name={'video-camera'} size={35} color={'black'}/>
const ProfileCard = () => {
    const user = {
        avatar: "https://scontent.fuio5-1.fna.fbcdn.net/v/t39.30808-6/405243219_7077188329007629_4784683618016670664_n.jpg?_nc_cat=102&ccb=1-7&_nc_sid=efb6e6&_nc_eui2=AeG6brN8LazvBkG_SoZyLyYoNwTEczsGl8E3BMRzOwaXwZPJ8EAuIp2Gg54CBTvGz3WKvQFdFlPiJZcGcvjCmzv8&_nc_ohc=jZ0JHG_EW6AAX-uoRnX&_nc_ht=scontent.fuio5-1.fna&oh=00_AfDEpR69ZoLZggWWRHicuAx1K03gRzqjKsKrPaQLEPjDyw&oe=65D35195",
        coverPhoto: "https://scontent.fuio5-1.fna.fbcdn.net/v/t39.30808-6/345466025_650030253572606_5714199206693169599_n.jpg?_nc_cat=104&ccb=1-7&_nc_sid=783fdb&_nc_eui2=AeFOu86-KlkzJLYhVSiYJ5n6CzMAXXWoXyoLMwBddahfKhNyBiCq4hm3U8FiNZMLyx84ByKNIuDjVORAKMxC_nFC&_nc_ohc=YJ6VqoLzQQcAX-vlG8L&_nc_ht=scontent.fuio5-1.fna&oh=00_AfBYAm5ivG8LkzTc6rSPCpD2cLO4NWEoFq8whF4Il80faw&oe=65D26EB5",
        name: "David Soria"
    }
    return (
        <View style={styles.container}>
            <Image source={{uri: user.coverPhoto}} style={styles.coverPhoto}/>

            <View style={styles.avatarContainer}>
                <Image source={{uri: user.avatar}} style={styles.avatar}/>
                <Text style={styles.name}>
                    {user.name}
                </Text>
            </View>
            
            <View style={styles.buttonContainer}>

                <TouchableWithoutFeedback style={{color: 'blue'}} onPress={() => {
                    Linking.openURL('https://web.telegram.org/k/')
                }}>
                    {telegram}
                </TouchableWithoutFeedback>
                <TouchableWithoutFeedback style={{color: 'blue'}} onPress={() => {
                    Linking.openURL('https://store.steampowered.com/?l=spanish')
                }}>
                    {steam}
                </TouchableWithoutFeedback>
                <TouchableWithoutFeedback style={{color: 'blue'}} onPress={() => {
                    Linking.openURL('https://www.twitch.tv/djleepro9613')
                }}>
                    {twitch}
                </TouchableWithoutFeedback>

                <TouchableWithoutFeedback style={{color: 'blue'}} onPress={()=>Linking.openURL('https://linkedin.com/')}>
                    {linkedin}
                </TouchableWithoutFeedback>
               
                <TouchableWithoutFeedback style={{color: 'blue'}} onPress={()=>Linking.openURL('https://www.kwai.com/es')}>
                    {kwai}
                </TouchableWithoutFeedback>
                

            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        alignItems: 'center' //flex y grid
    },
    coverPhoto: {
        width: '80%',
        height: '80%',
        resizeMode: 'cover'

    },
    avatarContainer: {
        alignItems: 'center',
        marginTop: -10
    },
    avatar: {
        width: 250,
        height: 250,
        borderRadius: 150,
        borderWidth: 10,
        borderColor: 'white'
    },
    name: {
        marginTop: 15,
        fontSize: 45,
        fontWeight: 'bold'
    },
    buttonContainer: {
        flexDirection: 'row',
        marginTop: 40,
        width: '35%',
        justifyContent: 'space-between'
    }
});
export default ProfileCard