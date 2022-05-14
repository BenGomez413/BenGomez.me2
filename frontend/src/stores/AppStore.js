import { writable } from 'svelte/store'

export const page = writable('home')
export const loading = writable(false)

//socket.io
import { io } from 'socket.io-client'
export const socket = writable(io('http://localhost:5000'))
export const socketStatus = writable(0) //ON: 1, OFF: 0, ERROR: -1

