import React, { useState } from "react";
import { Text, View, StyleSheet, Button, TextInput, Image } from "react-native";
import * as ExpoDocumentPicker from "expo-document-picker";

const Pdf = () => {
    const [fileUri, setFileUri] = useState(null);
    const [question, setQuestion] = useState('');
    const [result, setResult] = useState('');
  
    const handleFilePicker = async () => {
        let result = await ExpoDocumentPicker.getDocumentAsync({ copyToCacheDirectory: true });
        setFileUri(result.uri);
    };
  
    const handleUpload = async () => {
        try {
            const data = new FormData();
            data.append('question', question);
            data.append('file', fileUri);
  
            const response = await fetch('http://192.168.1.4:9004/upload', {
                method: 'POST',
                body: data
            });
  
            if (response.ok) {
                setQuestion('');
                const responseJSON = await response.json();
                setResult(responseJSON.text);
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <View>
            <Button title={'Select File'} onPress={handleFilePicker}/>
            {fileUri && (
                <View style={styles.fileContainer}>
                    <Image source={require('./file-icon.png')} style={styles.fileIcon} />
                    <Text style={styles.fileName}>{fileUri.substring(fileUri.lastIndexOf('/') + 1)}</Text>
                </View>
            )}
            <TextInput
                style={styles.input}
                value={question}
                onChangeText={setQuestion}
                placeholder={'Ingresa tu pregunta'}
            />
            <Button title={'Send'} onPress={handleUpload}/>
            <Text>{result}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    input: {
        backgroundColor: 'white',
        borderWidth: 1,
        borderRadius: 10,
        padding: 10,
        margin: 10
    },
    fileContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 10
    },
    fileIcon: {
        width: 50,
        height: 50,
        marginRight: 10
    },
    fileName: {
        fontSize: 16
    }
});

export default Pdf;
