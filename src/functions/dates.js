export function FormatarDatas(data){
    const dia = data.slice(8)
    const mes = data.slice(5,7)
    const ano = data.slice(0,4)

    const novaData = `${dia}/${mes}/${ano}`

    if(data == ''){
        return ''
    }
    else{
        return novaData
    }

}