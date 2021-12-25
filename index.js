const readline = require("readline-sync")
const JSONdb = require("simple-json-db")
const db = new JSONdb("./database.json")
const data = require("./database.json")

send()

function send(){
	console.clear()
	console.log(" +--------(Manage)--------+\n")
	console.log("| 1 - for signup account.")
	console.log("| 2 - for signin account.")
	const input = readline.question("\n> Select: ")
	if(input == 1){
		sendUp()
		return true
	}
	if(input == 2){
		sendIn()
		return true
	}
}

function sendUp(){
	console.clear()
	console.log(" +--------(Signup)--------+\n")
	const user = readline.question("\n> Username: ")
	if(db.has(user)){
		sendIn()
		return true
	}
	const pass = readline.question("> Password: ")
	db.set(user, {
		"password": pass,
		"name": user,
		"rank": "Guest",
		"balance": 0
	});
	sendManage(user)
}

function sendIn(){
	console.clear()
	console.log(" +--------(Signin)--------+\n")
	const user = readline.question("\n> Username: ")
	if(!db.has(user)){
		sendUp()
		return true
	}
	const pass = readline.question("> Password: ")
	if(pass !== data[user]["password"]){
		sendIn()
	}else{
		sendManage(user)
	}
}

function sendManage(user){
	console.clear()
	console.log("Form account of " + data[user]["name"] + "!")
	console.log("________________________")
	console.log("| Username: " + user)
	console.log("| Rank Type: " + data[user]["rank"])
	console.log("| Balance: $" + data[user]["balance"])
	console.log("\n\nThis is form your account.")
	console.log("(0) for Logout")
	const input = readline.question("\n> Select: ")
	if(input == 0){
		return true
	}
}
