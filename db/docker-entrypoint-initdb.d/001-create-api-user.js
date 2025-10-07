db.createUser({
	user: __USERNAME__,
	pwd: __PASSWORD__,
	roles: [
		{
			role: "read", db: "abiotic_assistant"
		}
	]
});
