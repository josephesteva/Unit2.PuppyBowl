state = {
	puppies: []
}

const main = document.querySelector(`main`);

const getAllPuppies = async () => {
	try {
		const response = await fetch(`https://fsa-puppy-bowl.herokuapp.com/api/2310-FSA-ET-WEB-FT-SF/players`);
		const puppiesJSON = await response.json();
		state.puppies = puppiesJSON.data.players;
		console.log(state.puppies);
	} catch {
		console.log(`Error retrieving data from puppies API`);
	}
	renderAllPuppies(state.puppies);
}

const renderAllPuppies = (puppies) => {
	main.innerHTML = ``
	puppies.forEach(puppy => {
		const puppyCard = document.createElement(`section`);
		puppyCard.style = "display: flex; flex-direction: column; justify-content: space-between; align-items: center; width: 280px; border: solid gold 2px; margin: 5px 20px"
		puppyCard.id = puppy.id;
		puppyCard.innerHTML = `
		<h2>${puppy.name}</h2>
		<h3 style = "text-align: center; margin: 1em">${puppy.breed}</h3>
		<img src = "${puppy.imageUrl}" alt = "${puppy.name}" style = "width: 200px; height: 300px; margin:10px"/>
		`;
		main.appendChild(puppyCard);

		puppyCard.addEventListener(`click`, () => {
			renderSinglePuppy(puppyCard.id);
		});
	})
}

const renderSinglePuppy = async (puppyId) => {
		const response = await fetch(`https://fsa-puppy-bowl.herokuapp.com/api/2310-FSA-ET-WEB-FT-SF/players/${puppyId}`)
		const puppyJSON = await response.json();
		const singlePuppy = puppyJSON.data.player;
		main.innerHTML = `
		<section style="display: flex; flex-direction: column; align-items: center; width: 500px; border: solid gold 2px; margin: 5px 20px">
		<h2>${singlePuppy.name}</h2>
		<h3 style = "text-align: center; margin: 1em">${singlePuppy.breed}</h3>
		<img src = "${singlePuppy.imageUrl}" alt = "${singlePuppy.name}" style = "width: 400px; height: 600px"/>
		<p>${singlePuppy.name} is on Team ${singlePuppy.teamId} and is a ${singlePuppy.status} puppy!</p>
		<button>Back to Puppy List</button>
		</section>
		`
		const button = document.querySelector(`button`);
		button.addEventListener(`click`, () => {
			getAllPuppies();
		})
		console.log(singlePuppy);
	}

getAllPuppies();