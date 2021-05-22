export const shorternText = (text) => {
    let wordLength = 18
    let textSplit = text.split(" ")

    if(textSplit.length <= wordLength){
        return text
    }
        
    let newText = textSplit.splice(0, wordLength)
    
    return (
        `${newText.join(" ")}...`
    )

   
}