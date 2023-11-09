state = {
	puppies: []
}

const getAllPuppies = async () => {
	try {
		const response = await fetch(`https://fsa-puppy-bowl.herokuapp.com/api/2310-FSA-ET-WEB-FT-SF/players`);
		const puppiesJSON = await response.json();
		state.puppies = puppiesJSON.data.players;
	} catch {
		console.log(`Error retrieving data from puppies API`);
	}
	renderAllPuppies(state.puppies);
}

const renderAllPuppies = (puppies) => {
	const main = document.querySelector(`main`);
	puppies.forEach(puppy => {
		const puppyCard = document.createElement(`section`);
		puppyCard.style = "width: 240px; border: solid gold 2px"
		puppyCard.innerHTML = `
		<h2>${puppy.name}</h2>
		<h3>${puppy.breed}</h3>
		<img src = "${puppy.imageUrl}" alt = "${puppy.name}" style = "width: 200px; height: 300px"/>
		<p>${puppy.name} is on Team ${puppy.teamId}<p>
		`
		main.appendChild(puppyCard)
		console.log(puppy);
	});
}

getAllPuppies();