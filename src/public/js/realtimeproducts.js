function reqParamId(){
    const formDel = document.getElementById('pid')
    let pid = formDel.value
    const request = new XMLHttpRequest()
    console.log('This is a test')
    request.open("POST", "http://192.168.100.24:8080/realtimeproducts/")
    request.send(pid)
}


