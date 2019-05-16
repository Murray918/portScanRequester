const net = require('net')
const writeFile = require('./write-to-file')

// this is the meat and potatoes of this project. Here we create a IIFE( ) to create a socket an try to connect to each port from start to end. this function takes a host, start, end, and timeout. @param: host => this is target hostname or ip number. @param: start => the beginning of the port range. @param: end => this is the end of the port range. @param : timeout => this tells the how long to wait for a response before it destroys itself.

const scanPort = async (host, port, timeout) => {
  // we need to wrap this port scanning function in an IIFE syntax so that that we can encapsulates the initiation of the Socket. This keeps us from polluting the global scope and the stack with all of the event emitters that we are creating in the loop. This keeps our callbacks from getting lost in the mix because we fire this function ...like 100000 times.
  ;(function(host, port, timeout) {
    let socket = new net.Socket()
    let portInfo

    //destroy all sockets that do not connect
    socket.setTimeout(timeout, () => {
      socket.destroy()
    })

    //if we connect to a port write that port to our port.log.
    socket.connect(port, host, () => {
      portInfo = `OPEN : ${port}`
      writeFile('./tmp/port-log.log', `hostname : ${host}\n ${portInfo}`)
      // we don't destroy the socket cos we want to listen to data event
      // the socket will self-destruct in 2 secs cos of the timeout we set, so no worries
    })

    // if any data is written to the client on connection, show it
    socket.on('data', data => {
      writeFile('./tmp/port-log.log', `hostname : ${host} \n DATA : ${data} `)
      console.log(`DATA : ${data}`)
      socket.destroy()
    })

    socket.on('error', error => {
      // silently catch all errors - and assume the port is closed
      //this may not be the best option for now but we will change this as needed.
      socket.destroy()
    })

    //invoke our function immediately with our proper variables
  })(host, port, timeout)
}

const portScan = (host, start, end, timeout) => {
  //currently we are using a while loop to fire this function off 10000 times this is somewhat clean for now but we might neeed to clean this up later
  while (start <= end) {
    port = start
    scanPort(host, port, timeout)
    start++
  }
  //return a success message
  return 'success'
}

module.exports = { portScan }
