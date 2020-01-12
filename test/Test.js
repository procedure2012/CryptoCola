const ColaPresentation = artifacts.require("ColaPresentation");

contract("test", async (accounts) => {

	it ("test buy colas", async () => {
		let colaPresentation = await ColaPresentation.deployed();
		await colaPresentation.produceRandomCola("1", {from: accounts[2]});
		await colaPresentation.produceRandomCola("2", {from: accounts[2]});
		//await colaPresentation.mixCola("3", 0, 1, {from: accounts[2]});
		await colaPresentation.sellCola(1, 2, {from: accounts[2]});
		let count = await colaPresentation.getCountByOwner(accounts[2]);
		assert.equal(count, 2, "number");
		let results = await colaPresentation.getColaByOwner(accounts[2], {from: accounts[2]});
		assert.equal(results[0], 0, "name1");
		assert.equal(results[1], 1, "name3");
		results = await colaPresentation.getColaMarket();
		assert.equal(results.length, 1, "number of market");
		assert.equal(results[0], 1, "item of market");

		/*let owner = await colaPresentation.colaToOwner(1);
		assert.equal(owner, colaPresentation.address, "address");
		let seller = await colaPresentation.colaToAuction(1);
		assert.equal(seller.seller, accounts[2], "seller");
		let price = await colaPresentation.colaToAuction(1);
		assert.equal(price.price, 2*10**18, "price");*/
		//let isOn = await colaPresentation.colaToAuction(1);
		//assert.equal(isOn.isOn, true, "ison");

		await colaPresentation.buyCola(1, {from: accounts[0], value: 2000000000000000000});
		count = await colaPresentation.getCountByOwner(accounts[0]);
		assert.equal(count, 1, "count of 0");
		count = await colaPresentation.getCountByOwner(accounts[2]);
		assert.equal(count, 1, "count of 2");

		/*await colaPresentation.sellCola(1, 2, {from: accounts[2]});
		await colaPresentation.buyCola(1, {from: accounts[0], value: 2000000000000000000});
		//await colaPresentation.transferFrom(accounts[2], accounts[0], 1, {from: accounts[2]});
		let count = await colaPresentation.ownerColaCount(accounts[0]);
		assert.equal(count, 1, "number");
		count = await colaPresentation.ownerColaCount(accounts[2]);
		assert.equal(count, 1, "number2");
		let owner = await colaPresentation.colaToOwner(1);
		assert.equal(owner, accounts[0], "owner");
		owner = await colaPresentation.colaToOwner(0);
		assert.equal(owner, accounts[2], "owner2");*/
	})
})
