let currentPage = 0;
const itemsPerPage = 12;

function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function filterCards() {
    const selectedArtists = Array.from(document.querySelectorAll('.artist-checkbox:checked'))
        .map(cb => {
            const label = document.querySelector(`label[for="${cb.id}"]`);
            return label.innerText;
        });

    const cardElements = document.querySelectorAll('.grid-item');
    cardElements.forEach(cardElement => {
        const artistName = cardElement.getAttribute('data-artist');
        if (selectedArtists.length === 0 || selectedArtists.includes(artistName)) {
            cardElement.style.display = 'flex';
        } else {
            cardElement.style.display = 'none';
        }
    });
}

async function fetchCardImage(scryfallId) {
    await delay(50); // Add a delay of 50 milliseconds
    const response = await fetch(`https://cards.scryfall.io/png/front/${scryfallId[0]}/${scryfallId[1]}/${scryfallId}.png`);
    if (response.ok) {
        return response.url;
    } else {
        throw new Error('Card not found or invalid ID.')
    }
}

document.getElementById('user_input').addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        event.preventDefault();
        const userInput = document.getElementById('user_input').value;
        if (userInput.includes('moxfield')) {
            fetch('/submit-url', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ url: userInput })
            })
            .then(response => response.json())
            .then(data => {
                if (data.error) {
                    console.log(data.error);
                } else {
                    document.getElementById('message').innerText = '';
                    const mainboardContainer = document.getElementById('mainboard_container');
                    mainboardContainer.innerHTML = ''; // Clear previous content
                    mainboardContainer.classList = "grid-container-2"
    
                    // Clear the input box
                    document.getElementById('user_input').value = '';

                    const mainboard = data.mainboard;
                    console.log(mainboard);

                    for (const card in mainboard) {
                        if (mainboard.hasOwnProperty(card)) {
                            const cardDetails = mainboard[card].card;
                            const cardName = card;
                            fetchCardImage(cardDetails.scryfall_id)
                                .then(cardArt => {
                                    const gridItem = document.createElement('div');
                                    gridItem.className = 'grid-item';
                                    gridItem.setAttribute('data-artist', cardDetails.artist);

                                    gridItem.innerHTML = `
                                        <div class="card3d">
                                        <img src="${cardArt}" alt="${cardName}">
                                        </div>
                                    `;
                                    mainboardContainer.appendChild(gridItem);
                                })
                                .catch(error => {
                                    console.error('Error fetching card image:', error);
                                });
                        }
                    }
                }
            })
            .catch((error) => {
                console.error('Error:', error);
            });
        } else {
            document.getElementById('message').innerText = 'Invalid Moxfield URL :(';
            setTimeout(() => {
                document.getElementById('message').innerText = 'Start by searching your Moxfield deck in the top left corner.';
            }, 1500); // Match this duration with the CSS transition duration
        }
    }
});

document.querySelector('.expand-icon').addEventListener('click', function() {
    const inputBox = document.querySelector('.input-box');
    if (inputBox.style.width === '0px') {
        inputBox.style.width = '400px';
        inputBox.style.border = '1px solid #000';
    } else {
        const userInput = document.getElementById('user_input').value;
        if (userInput) {
            if (userInput.includes('moxfield')) {
                fetch('/', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ url: userInput })
                })
                .then(response => response.json())
                .then(data => {
                    console.log('Success:', data);
                })
                .catch((error) => {
                    console.error('Error:', error);
                });
            } else {
                document.getElementById('message').innerText = 'Invalid Moxfield URL :(';
                setTimeout(() => {
                    document.getElementById('message').innerText = 'Start by searching your Moxfield deck in the top left corner.';
                }, 1500); // Match this duration with the CSS transition duration
            }  
        } else {
            inputBox.style.width = '0px';
            inputBox.style.border = 'none';
        }
    }
});

function map(val, minA, maxA, minB, maxB) {
    return minB + ((val - minA) * (maxB - minB)) / (maxA - minA);
  }
  
  function Card3D(card, ev) {
    let img = card.querySelector('img');
    let imgRect = card.getBoundingClientRect();
    let width = imgRect.width;
    let height = imgRect.height;
    let mouseX = ev.offsetX;
    let mouseY = ev.offsetY;
    let rotateY = map(mouseX, 0, 180, -25, 25);
    let rotateX = map(mouseY, 0, 250, 25, -25);
    let brightness = map(mouseY, 0, 250, 1.5, 0.5);
    
    img.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    img.style.filter = `brightness(${brightness})`;
  }
  
  var cards = document.querySelectorAll('.card3d');
  
  cards.forEach((card) => {
    card.addEventListener('mousemove', (ev) => {
      Card3D(card, ev);
    });
    
    card.addEventListener('mouseleave', (ev) => {
      let img = card.querySelector('img');
      
      img.style.transform = 'rotateX(0deg) rotateY(0deg)';
      img.style.filter = 'brightness(1)';
    });
});

const options = [
    {
        "id": "artist0",
        "name": "Aaron Boyd"
    },
    {
        "id": "artist1",
        "name": "Aaron Forsythe"
    },
    {
        "id": "artist2",
        "name": "Aaron J. Riley"
    },
    {
        "id": "artist3",
        "name": "Aaron Miller"
    },
    {
        "id": "artist4",
        "name": "Aaron Reed"
    },
    {
        "id": "artist5",
        "name": "Abigail Larson"
    },
    {
        "id": "artist6",
        "name": "Abz J Harding"
    },
    {
        "id": "artist7",
        "name": "Adam Burn"
    },
    {
        "id": "artist8",
        "name": "Adam Paquette"
    },
    {
        "id": "artist9",
        "name": "Adam Rex"
    },
    {
        "id": "artist10",
        "name": "Adam Vehige"
    },
    {
        "id": "artist11",
        "name": "Adam Volker"
    },
    {
        "id": "artist12",
        "name": "Adi Granov"
    },
    {
        "id": "artist13",
        "name": "Adrian Majkrzak"
    },
    {
        "id": "artist14",
        "name": "Adrián Rodríguez Pérez"
    },
    {
        "id": "artist15",
        "name": "Adrian Smith"
    },
    {
        "id": "artist16",
        "name": "Aenami"
    },
    {
        "id": "artist17",
        "name": "Aeron Ng"
    },
    {
        "id": "artist18",
        "name": "Ai Desheng"
    },
    {
        "id": "artist19",
        "name": "Ai Nanahira"
    },
    {
        "id": "artist20",
        "name": "Airi Yoshihisa"
    },
    {
        "id": "artist21",
        "name": "akio"
    },
    {
        "id": "artist22",
        "name": "AKQA"
    },
    {
        "id": "artist23",
        "name": "Alan Pollack"
    },
    {
        "id": "artist24",
        "name": "Alan Rabinowitz"
    },
    {
        "id": "artist25",
        "name": "Alayna Danner"
    },
    {
        "id": "artist26",
        "name": "AlbaBG"
    },
    {
        "id": "artist27",
        "name": "Al Davidson"
    },
    {
        "id": "artist28",
        "name": "Aldo Domínguez"
    },
    {
        "id": "artist29",
        "name": "Alejandro Mirabal"
    },
    {
        "id": "artist30",
        "name": "Aleksi Briclot"
    },
    {
        "id": "artist31",
        "name": "Alessandra Pisano"
    },
    {
        "id": "artist32",
        "name": "Alexander Forssberg"
    },
    {
        "id": "artist33",
        "name": "Alexander Gering"
    },
    {
        "id": "artist34",
        "name": "Alexander Khabbazi"
    },
    {
        "id": "artist35",
        "name": "Alexander Kintner"
    },
    {
        "id": "artist36",
        "name": "Alexander Mokhov"
    },
    {
        "id": "artist37",
        "name": "Alexander Ostrowski"
    },
    {
        "id": "artist38",
        "name": "Alexandre Breton"
    },
    {
        "id": "artist39",
        "name": "Alexandre Chaudret"
    },
    {
        "id": "artist40",
        "name": "Alexandre Honoré"
    },
    {
        "id": "artist41",
        "name": "Alexandre Leoni"
    },
    {
        "id": "artist42",
        "name": "Alexandr Leskinen"
    },
    {
        "id": "artist43",
        "name": "Alex Brock"
    },
    {
        "id": "artist44",
        "name": "Alex Dos Diaz"
    },
    {
        "id": "artist45",
        "name": "Alexey Kruglov"
    },
    {
        "id": "artist46",
        "name": "Alex Horley-Orlandelli"
    },
    {
        "id": "artist47",
        "name": "Alexis Hernandez"
    },
    {
        "id": "artist48",
        "name": "Alexis Ziritt"
    },
    {
        "id": "artist49",
        "name": "Alex Konstad"
    },
    {
        "id": "artist50",
        "name": "Alex Negrea"
    },
    {
        "id": "artist51",
        "name": "Alex Petty"
    },
    {
        "id": "artist52",
        "name": "Alex Stone"
    },
    {
        "id": "artist53",
        "name": "Alex Tarca"
    },
    {
        "id": "artist54",
        "name": "Alfven Ato"
    },
    {
        "id": "artist55",
        "name": "Alice Xia Zhang"
    },
    {
        "id": "artist56",
        "name": "Alicia Mickes"
    },
    {
        "id": "artist57",
        "name": "Alina Marica"
    },
    {
        "id": "artist58",
        "name": "Alisa Lee"
    },
    {
        "id": "artist59",
        "name": "Alison Luhrs"
    },
    {
        "id": "artist60",
        "name": "Alix Branwyn"
    },
    {
        "id": "artist61",
        "name": "Aliya, age 5½"
    },
    {
        "id": "artist62",
        "name": "Allen Douglas"
    },
    {
        "id": "artist63",
        "name": "Allen Morris"
    },
    {
        "id": "artist64",
        "name": "Allen Williams"
    },
    {
        "id": "artist65",
        "name": "Allison Carl"
    },
    {
        "id": "artist66",
        "name": "Alli Steele"
    },
    {
        "id": "artist67",
        "name": "Alton Lawson"
    },
    {
        "id": "artist68",
        "name": "Álvaro Calvo Escudero"
    },
    {
        "id": "artist69",
        "name": "Amayagido"
    },
    {
        "id": "artist70",
        "name": "A. M. Sartor"
    },
    {
        "id": "artist71",
        "name": "Amy Weber"
    },
    {
        "id": "artist72",
        "name": "Anastasia Balakchina"
    },
    {
        "id": "artist73",
        "name": "Anastasia Ovchinnikova"
    },
    {
        "id": "artist74",
        "name": "Anato Finnstark"
    },
    {
        "id": "artist75",
        "name": "Andi Rusu"
    },
    {
        "id": "artist76",
        "name": "Anditya Dita"
    },
    {
        "id": "artist77",
        "name": "Andréa Blouin"
    },
    {
        "id": "artist78",
        "name": "Andrea De Dominicis"
    },
    {
        "id": "artist79",
        "name": "Andrea Piparo"
    },
    {
        "id": "artist80",
        "name": "Andrea Radeck"
    },
    {
        "id": "artist81",
        "name": "Andrea Sipl"
    },
    {
        "id": "artist82",
        "name": "Andreas Rocha"
    },
    {
        "id": "artist83",
        "name": "Andreas Zafiratos"
    },
    {
        "id": "artist84",
        "name": "Andreia Ugrai"
    },
    {
        "id": "artist85",
        "name": "Andrew Goldhawk"
    },
    {
        "id": "artist86",
        "name": "Andrew Huerta"
    },
    {
        "id": "artist87",
        "name": "Andrew MacLean"
    },
    {
        "id": "artist88",
        "name": "Andrew Mar"
    },
    {
        "id": "artist89",
        "name": "Andrew Murray"
    },
    {
        "id": "artist90",
        "name": "Andrew Robinson"
    },
    {
        "id": "artist91",
        "name": "Andrew Theophilopoulos"
    },
    {
        "id": "artist92",
        "name": "Andrey Kuzinskiy"
    },
    {
        "id": "artist93",
        "name": "Andrey Nyarl"
    },
    {
        "id": "artist94",
        "name": "AndWorld Design"
    },
    {
        "id": "artist95",
        "name": "Andy Brase"
    },
    {
        "id": "artist96",
        "name": "Andy Williams"
    },
    {
        "id": "artist97",
        "name": "Ângelo Bortolini"
    },
    {
        "id": "artist98",
        "name": "Aniekan Udofia"
    },
    {
        "id": "artist99",
        "name": "Anik Sikder"
    },
    {
        "id": "artist100",
        "name": "Anna Christenson"
    },
    {
        "id": "artist101",
        "name": "Anna Fehr"
    },
    {
        "id": "artist102",
        "name": "Anna Mitura-Laskowska"
    },
    {
        "id": "artist103",
        "name": "Anna Pavleeva"
    },
    {
        "id": "artist104",
        "name": "Anna Podedworna"
    },
    {
        "id": "artist105",
        "name": "Anna Steinbauer"
    },
    {
        "id": "artist106",
        "name": "Annie Sardelis"
    },
    {
        "id": "artist107",
        "name": "Ann-Sophie De Steur"
    },
    {
        "id": "artist108",
        "name": "Anson Maddocks"
    },
    {
        "id": "artist109",
        "name": "Anthony Devine"
    },
    {
        "id": "artist110",
        "name": "Anthony Francisco"
    },
    {
        "id": "artist111",
        "name": "Anthony Jones"
    },
    {
        "id": "artist112",
        "name": "Anthony Palumbo"
    },
    {
        "id": "artist113",
        "name": "Anthony S. Waters"
    },
    {
        "id": "artist114",
        "name": "Antonio Bravo"
    },
    {
        "id": "artist115",
        "name": "Antonio José Manzanedo"
    },
    {
        "id": "artist116",
        "name": "Anton Solovianchyk"
    },
    {
        "id": "artist117",
        "name": "Aogachou"
    },
    {
        "id": "artist118",
        "name": "Apolo Cacho"
    },
    {
        "id": "artist119",
        "name": "April Lee"
    },
    {
        "id": "artist120",
        "name": "April Prime"
    },
    {
        "id": "artist121",
        "name": "Arash Radkia"
    },
    {
        "id": "artist122",
        "name": "Areku Nishiki"
    },
    {
        "id": "artist123",
        "name": "Ari"
    },
    {
        "id": "artist124",
        "name": "Ariel Olivetti"
    },
    {
        "id": "artist125",
        "name": "Ariel Perez"
    },
    {
        "id": "artist126",
        "name": "Arik Roper"
    },
    {
        "id": "artist127",
        "name": "Ari Nieh"
    },
    {
        "id": "artist128",
        "name": "Armand Baltazar"
    },
    {
        "id": "artist129",
        "name": "Arnie Swekel"
    },
    {
        "id": "artist130",
        "name": "Arthur Yuan"
    },
    {
        "id": "artist131",
        "name": "Artur Nakhodkin"
    },
    {
        "id": "artist132",
        "name": "Artur Treffner"
    },
    {
        "id": "artist133",
        "name": "Ashlea Kelly"
    },
    {
        "id": "artist134",
        "name": "Ashley Mackenzie"
    },
    {
        "id": "artist135",
        "name": "Ash Wood"
    },
    {
        "id": "artist136",
        "name": "Astri Lohne"
    },
    {
        "id": "artist137",
        "name": "Atsushi Furusawa"
    },
    {
        "id": "artist138",
        "name": "Audrey Benjaminsen"
    },
    {
        "id": "artist139",
        "name": "Augusto Quirino"
    },
    {
        "id": "artist140",
        "name": "Aurore Folny"
    },
    {
        "id": "artist141",
        "name": "Austin Hsu"
    },
    {
        "id": "artist142",
        "name": "Autumn Rain Turkel"
    },
    {
        "id": "artist143",
        "name": "Awanqi (Angela Wang)"
    },
    {
        "id": "artist144",
        "name": "Axel Sauerwald"
    },
    {
        "id": "artist145",
        "name": "Aya Kakeda"
    },
    {
        "id": "artist146",
        "name": "Aya Kato"
    },
    {
        "id": "artist147",
        "name": "Ayako Ishiguro"
    },
    {
        "id": "artist148",
        "name": "Ayami Kojima"
    },
    {
        "id": "artist149",
        "name": "Ayami Nakashima"
    },
    {
        "id": "artist150",
        "name": "Ayuko"
    },
    {
        "id": "artist151",
        "name": "Azur"
    },
    {
        "id": "artist152",
        "name": "Azutaro"
    },
    {
        "id": "artist153",
        "name": "Babs Webb"
    },
    {
        "id": "artist154",
        "name": "Babyson Chen"
    },
    {
        "id": "artist155",
        "name": "Bad Flip Productions, Inc."
    },
    {
        "id": "artist156",
        "name": "Bakshi Productions"
    },
    {
        "id": "artist157",
        "name": "Barbara Rosiak"
    },
    {
        "id": "artist158",
        "name": "Barbara Witkowska"
    },
    {
        "id": "artist159",
        "name": "Bardo Bread"
    },
    {
        "id": "artist160",
        "name": "Barely Human"
    },
    {
        "id": "artist161",
        "name": "Bartek Fedyczak"
    },
    {
        "id": "artist162",
        "name": "Bartłomiej Gaweł"
    },
    {
        "id": "artist163",
        "name": "Bastien Grivet"
    },
    {
        "id": "artist164",
        "name": "Bastien L. Deharme"
    },
    {
        "id": "artist165",
        "name": "Bayard Wu"
    },
    {
        "id": "artist166",
        "name": "BBC Studios"
    },
    {
        "id": "artist167",
        "name": "BD"
    },
    {
        "id": "artist168",
        "name": "BEMOCS"
    },
    {
        "id": "artist169",
        "name": "Bene Rohlmann"
    },
    {
        "id": "artist170",
        "name": "Ben Hill"
    },
    {
        "id": "artist171",
        "name": "Benjamin Ee"
    },
    {
        "id": "artist172",
        "name": "Ben Maier"
    },
    {
        "id": "artist173",
        "name": "Ben Schnuck"
    },
    {
        "id": "artist174",
        "name": "Ben Thompson"
    },
    {
        "id": "artist175",
        "name": "Ben Wootten"
    },
    {
        "id": "artist176",
        "name": "Berry"
    },
    {
        "id": "artist177",
        "name": "Betty Jiang"
    },
    {
        "id": "artist178",
        "name": "Bill McConkey"
    },
    {
        "id": "artist179",
        "name": "Bill Sienkiewicz"
    },
    {
        "id": "artist180",
        "name": "Billy Christian"
    },
    {
        "id": "artist181",
        "name": "Blackie del Rio"
    },
    {
        "id": "artist182",
        "name": "BLUMOO"
    },
    {
        "id": "artist183",
        "name": "Bob Eggleton"
    },
    {
        "id": "artist184",
        "name": "Bob Petillo"
    },
    {
        "id": "artist185",
        "name": "Bob Ross"
    },
    {
        "id": "artist186",
        "name": "BODAX"
    },
    {
        "id": "artist187",
        "name": "Boell Oyino"
    },
    {
        "id": "artist188",
        "name": "Bogdan Marica"
    },
    {
        "id": "artist189",
        "name": "Bogdan Rezunenko"
    },
    {
        "id": "artist190",
        "name": "Boneface"
    },
    {
        "id": "artist191",
        "name": "Bonnie Gabriel"
    },
    {
        "id": "artist192",
        "name": "Border"
    },
    {
        "id": "artist193",
        "name": "Borja Pindado"
    },
    {
        "id": "artist194",
        "name": "Bradley Williams"
    },
    {
        "id": "artist195",
        "name": "Brad Rigney"
    },
    {
        "id": "artist196",
        "name": "Brain Dead"
    },
    {
        "id": "artist197",
        "name": "Bram Sels"
    },
    {
        "id": "artist198",
        "name": "Brandi Milne"
    },
    {
        "id": "artist199",
        "name": "Brandi Reece"
    },
    {
        "id": "artist200",
        "name": "Brandon Dorman"
    },
    {
        "id": "artist201",
        "name": "Brandon Kitkouski"
    },
    {
        "id": "artist202",
        "name": "Brandon L. Hunt"
    },
    {
        "id": "artist203",
        "name": "Brendan Sell"
    },
    {
        "id": "artist204",
        "name": "Brent Hollowell"
    },
    {
        "id": "artist205",
        "name": "Brian Despain"
    },
    {
        "id": "artist206",
        "name": "Brian Durfee"
    },
    {
        "id": "artist207",
        "name": "Brian Hagan"
    },
    {
        "id": "artist208",
        "name": "Brian Horton"
    },
    {
        "id": "artist209",
        "name": "Brian Snõddy"
    },
    {
        "id": "artist210",
        "name": "Brian Valeza"
    },
    {
        "id": "artist211",
        "name": "Brigitte Roka"
    },
    {
        "id": "artist212",
        "name": "Brittany Austin"
    },
    {
        "id": "artist213",
        "name": "Brock Grossman"
    },
    {
        "id": "artist214",
        "name": "Brom"
    },
    {
        "id": "artist215",
        "name": "Brooklyn Smith"
    },
    {
        "id": "artist216",
        "name": "BrooklynSnobs"
    },
    {
        "id": "artist217",
        "name": "Bruce Brenneise"
    },
    {
        "id": "artist218",
        "name": "Bruno Biazotto"
    },
    {
        "id": "artist219",
        "name": "Bryan Sola"
    },
    {
        "id": "artist220",
        "name": "Bryan Talbot"
    },
    {
        "id": "artist221",
        "name": "Brynn Metheney"
    },
    {
        "id": "artist222",
        "name": "Bryon Wackwitz"
    },
    {
        "id": "artist223",
        "name": "Bud Cook"
    },
    {
        "id": "artist224",
        "name": "Cabrol"
    },
    {
        "id": "artist225",
        "name": "Cacho Rubione"
    },
    {
        "id": "artist226",
        "name": "Caio E Santos"
    },
    {
        "id": "artist227",
        "name": "Caio Monteiro"
    },
    {
        "id": "artist228",
        "name": "Cai Tingting"
    },
    {
        "id": "artist229",
        "name": "Calder Moore"
    },
    {
        "id": "artist230",
        "name": "Camille Alquier"
    },
    {
        "id": "artist231",
        "name": "Campbell White"
    },
    {
        "id": "artist232",
        "name": "Canata Katana"
    },
    {
        "id": "artist233",
        "name": "Caramelaw"
    },
    {
        "id": "artist234",
        "name": "Cara Mitten"
    },
    {
        "id": "artist235",
        "name": "Carissa Susilo"
    },
    {
        "id": "artist236",
        "name": "Carl Critchlow"
    },
    {
        "id": "artist237",
        "name": "Carl Frank"
    },
    {
        "id": "artist238",
        "name": "Carlos Palma Cruchaga"
    },
    {
        "id": "artist239",
        "name": "Carly Mazur"
    },
    {
        "id": "artist240",
        "name": "Carmen Sinek"
    },
    {
        "id": "artist241",
        "name": "Carol Azevedo"
    },
    {
        "id": "artist242",
        "name": "Carol Heyer"
    },
    {
        "id": "artist243",
        "name": "Caroline Gariba"
    },
    {
        "id": "artist244",
        "name": "Casey Gustafson"
    },
    {
        "id": "artist245",
        "name": "Casimir Lee"
    },
    {
        "id": "artist246",
        "name": "CatDirty"
    },
    {
        "id": "artist247",
        "name": "Catherine Buck"
    },
    {
        "id": "artist248",
        "name": "Cecil Fernando"
    },
    {
        "id": "artist249",
        "name": "Chad Kanotz"
    },
    {
        "id": "artist250",
        "name": "Chad Weatherford"
    },
    {
        "id": "artist251",
        "name": "Charles Gillespie"
    },
    {
        "id": "artist252",
        "name": "Charles Urbach"
    },
    {
        "id": "artist253",
        "name": "Chase Stone"
    },
    {
        "id": "artist254",
        "name": "Chen Weidong"
    },
    {
        "id": "artist255",
        "name": "Chippy"
    },
    {
        "id": "artist256",
        "name": "chiri*"
    },
    {
        "id": "artist257",
        "name": "Chong Fei Giap"
    },
    {
        "id": "artist258",
        "name": "Chris Appelhans"
    },
    {
        "id": "artist259",
        "name": "Chris Bellach"
    },
    {
        "id": "artist260",
        "name": "Chris Clay"
    },
    {
        "id": "artist261",
        "name": "Chris Cold"
    },
    {
        "id": "artist262",
        "name": "Chris Dien"
    },
    {
        "id": "artist263",
        "name": "Chris Haukap"
    },
    {
        "id": "artist264",
        "name": "Chris J. Anderson"
    },
    {
        "id": "artist265",
        "name": "Chris Kiritz"
    },
    {
        "id": "artist266",
        "name": "Chris Mooney"
    },
    {
        "id": "artist267",
        "name": "Chris Ostrowski"
    },
    {
        "id": "artist268",
        "name": "Chris Rahn"
    },
    {
        "id": "artist269",
        "name": "Chris Rallis"
    },
    {
        "id": "artist270",
        "name": "Chris Seaman"
    },
    {
        "id": "artist271",
        "name": "Christian Angel"
    },
    {
        "id": "artist272",
        "name": "Christian Dimitrov"
    },
    {
        "id": "artist273",
        "name": "Christina Davis"
    },
    {
        "id": "artist274",
        "name": "Christina Kraus"
    },
    {
        "id": "artist275",
        "name": "Christine Choi"
    },
    {
        "id": "artist276",
        "name": "Christine Couture"
    },
    {
        "id": "artist277",
        "name": "Christine Lee Risinger"
    },
    {
        "id": "artist278",
        "name": "Christopher Burdett"
    },
    {
        "id": "artist279",
        "name": "Christopher Lovell"
    },
    {
        "id": "artist280",
        "name": "Christopher Moeller"
    },
    {
        "id": "artist281",
        "name": "Christopher Rush"
    },
    {
        "id": "artist282",
        "name": "Chris Tulach"
    },
    {
        "id": "artist283",
        "name": "Chuck Grieb"
    },
    {
        "id": "artist284",
        "name": "Chuck Lukacs"
    },
    {
        "id": "artist285",
        "name": "Chun Lo"
    },
    {
        "id": "artist286",
        "name": "Ciruelo"
    },
    {
        "id": "artist287",
        "name": "Clare Wong"
    },
    {
        "id": "artist288",
        "name": "Claudiu-Antoniu Magherusan"
    },
    {
        "id": "artist289",
        "name": "Cliff Childs"
    },
    {
        "id": "artist290",
        "name": "Cliff Nielsen"
    },
    {
        "id": "artist291",
        "name": "Clint Cearley"
    },
    {
        "id": "artist292",
        "name": "Clint Langley"
    },
    {
        "id": "artist293",
        "name": "Clint Lockwood"
    },
    {
        "id": "artist294",
        "name": "Clover.K"
    },
    {
        "id": "artist295",
        "name": "Clyde Caldwell"
    },
    {
        "id": "artist296",
        "name": "Cody Culp"
    },
    {
        "id": "artist297",
        "name": "Cole Eastburn"
    },
    {
        "id": "artist298",
        "name": "Colin Boyer"
    },
    {
        "id": "artist299",
        "name": "Colin MacNeil"
    },
    {
        "id": "artist300",
        "name": "Collin Estrada"
    },
    {
        "id": "artist301",
        "name": "Constantin Marin"
    },
    {
        "id": "artist302",
        "name": "Corey Bowen"
    },
    {
        "id": "artist303",
        "name": "Corey D. Macourek"
    },
    {
        "id": "artist304",
        "name": "Cornelius Brudi"
    },
    {
        "id": "artist305",
        "name": "Cory Godbey"
    },
    {
        "id": "artist306",
        "name": "Cory Trego-Erdner"
    },
    {
        "id": "artist307",
        "name": "Cos Koniotis"
    },
    {
        "id": "artist308",
        "name": "Cosmin Podar"
    },
    {
        "id": "artist309",
        "name": "Craig Elliott"
    },
    {
        "id": "artist310",
        "name": "Craig Hooper"
    },
    {
        "id": "artist311",
        "name": "Craig J Spearing"
    },
    {
        "id": "artist312",
        "name": "Craig Mullins"
    },
    {
        "id": "artist313",
        "name": "Cris Dornaus"
    },
    {
        "id": "artist314",
        "name": "Cristi Balanescu"
    },
    {
        "id": "artist315",
        "name": "Crocodile Jackson"
    },
    {
        "id": "artist316",
        "name": "CROM"
    },
    {
        "id": "artist317",
        "name": "Crystal Fae"
    },
    {
        "id": "artist318",
        "name": "Crystal Sully"
    },
    {
        "id": "artist319",
        "name": "Cynthia Sheppard"
    },
    {
        "id": "artist320",
        "name": "Cyril Van Der Haegen"
    },
    {
        "id": "artist321",
        "name": "Daarken"
    },
    {
        "id": "artist322",
        "name": "Daisuke Izuka"
    },
    {
        "id": "artist323",
        "name": "Daisuke Tatsuma"
    },
    {
        "id": "artist324",
        "name": "Dai-XT"
    },
    {
        "id": "artist325",
        "name": "Daken"
    },
    {
        "id": "artist326",
        "name": "D. Alexander Gregory"
    },
    {
        "id": "artist327",
        "name": "Dallas Williams"
    },
    {
        "id": "artist328",
        "name": "Dalton Pencarinha"
    },
    {
        "id": "artist329",
        "name": "Dameon Willich"
    },
    {
        "id": "artist330",
        "name": "Damian Tedrow"
    },
    {
        "id": "artist331",
        "name": "Dana Knutson"
    },
    {
        "id": "artist332",
        "name": "Dan Dos Santos"
    },
    {
        "id": "artist333",
        "name": "Daneen Wilkerson"
    },
    {
        "id": "artist334",
        "name": "Dan Frazier"
    },
    {
        "id": "artist335",
        "name": "Daniel Correia"
    },
    {
        "id": "artist336",
        "name": "Daniel Gelon"
    },
    {
        "id": "artist337",
        "name": "Daniel Holt"
    },
    {
        "id": "artist338",
        "name": "Daniel Ketchum"
    },
    {
        "id": "artist339",
        "name": "Daniel Lieske"
    },
    {
        "id": "artist340",
        "name": "Daniel Ljunggren"
    },
    {
        "id": "artist341",
        "name": "Daniel R. Horne"
    },
    {
        "id": "artist342",
        "name": "Daniel Romanovsky"
    },
    {
        "id": "artist343",
        "name": "Daniel Warren Johnson"
    },
    {
        "id": "artist344",
        "name": "Daniel Zrom"
    },
    {
        "id": "artist345",
        "name": "Dani Pendergast"
    },
    {
        "id": "artist346",
        "name": "Dan Mumford"
    },
    {
        "id": "artist347",
        "name": "Dan Murayama Scott"
    },
    {
        "id": "artist348",
        "name": "Danny Miller"
    },
    {
        "id": "artist349",
        "name": "Danny Schwartz"
    },
    {
        "id": "artist350",
        "name": "Dan Seagrave"
    },
    {
        "id": "artist351",
        "name": "Dan Watson"
    },
    {
        "id": "artist352",
        "name": "Dany Orizio"
    },
    {
        "id": "artist353",
        "name": "Darbury Stenderu"
    },
    {
        "id": "artist354",
        "name": "Darek Zabrocki"
    },
    {
        "id": "artist355",
        "name": "Daren Bader"
    },
    {
        "id": "artist356",
        "name": "Daria Aksenova"
    },
    {
        "id": "artist357",
        "name": "Daria Khlebnikova"
    },
    {
        "id": "artist358",
        "name": "Darrell Riche"
    },
    {
        "id": "artist359",
        "name": "Darren Tan"
    },
    {
        "id": "artist360",
        "name": "Dave Allsop"
    },
    {
        "id": "artist361",
        "name": "Dave DeVries"
    },
    {
        "id": "artist362",
        "name": "Dave Dorman"
    },
    {
        "id": "artist363",
        "name": "Dave Geyer"
    },
    {
        "id": "artist364",
        "name": "Dave Greco"
    },
    {
        "id": "artist365",
        "name": "Dave Humpherys"
    },
    {
        "id": "artist366",
        "name": "Dave Kendall"
    },
    {
        "id": "artist367",
        "name": "Dave Trampier"
    },
    {
        "id": "artist368",
        "name": "David A. Cherry"
    },
    {
        "id": "artist369",
        "name": "David Álvarez"
    },
    {
        "id": "artist370",
        "name": "David Astruga"
    },
    {
        "id": "artist371",
        "name": "David Auden Nash"
    },
    {
        "id": "artist372",
        "name": "David Borba"
    },
    {
        "id": "artist373",
        "name": "David Curtis"
    },
    {
        "id": "artist374",
        "name": "David Day"
    },
    {
        "id": "artist375",
        "name": "David Frasheski"
    },
    {
        "id": "artist376",
        "name": "David Gaillet"
    },
    {
        "id": "artist377",
        "name": "David Giraud"
    },
    {
        "id": "artist378",
        "name": "David Ho"
    },
    {
        "id": "artist379",
        "name": "David Horne"
    },
    {
        "id": "artist380",
        "name": "David Hudnut"
    },
    {
        "id": "artist381",
        "name": "David Martin"
    },
    {
        "id": "artist382",
        "name": "David McDarby"
    },
    {
        "id": "artist383",
        "name": "David Monette"
    },
    {
        "id": "artist384",
        "name": "David O'Connor"
    },
    {
        "id": "artist385",
        "name": "David Palumbo"
    },
    {
        "id": "artist386",
        "name": "David Petersen"
    },
    {
        "id": "artist387",
        "name": "David Rapoza"
    },
    {
        "id": "artist388",
        "name": "David Robert Hovey"
    },
    {
        "id": "artist389",
        "name": "David Seeley"
    },
    {
        "id": "artist390",
        "name": "David Seguin"
    },
    {
        "id": "artist391",
        "name": "David Semple"
    },
    {
        "id": "artist392",
        "name": "David Sladek"
    },
    {
        "id": "artist393",
        "name": "David Sondered"
    },
    {
        "id": "artist394",
        "name": "David Szabo"
    },
    {
        "id": "artist395",
        "name": "Davor Gromilović"
    },
    {
        "id": "artist396",
        "name": "Death Burger"
    },
    {
        "id": "artist397",
        "name": "Demitrios Feredinos"
    },
    {
        "id": "artist398",
        "name": "Denis Medri"
    },
    {
        "id": "artist399",
        "name": "Denis Nigmatullin"
    },
    {
        "id": "artist400",
        "name": "Denis Zhbankov"
    },
    {
        "id": "artist401",
        "name": "Denman Rooke"
    },
    {
        "id": "artist402",
        "name": "Dennis Detwiller"
    },
    {
        "id": "artist403",
        "name": "Denys Tsiperko"
    },
    {
        "id": "artist404",
        "name": "Dermot Power"
    },
    {
        "id": "artist405",
        "name": "Deruchenko Alexander"
    },
    {
        "id": "artist406",
        "name": "Desmuncubic"
    },
    {
        "id": "artist407",
        "name": "Deven Rue"
    },
    {
        "id": "artist408",
        "name": "Devin Platts"
    },
    {
        "id": "artist409",
        "name": "Diana Cearley"
    },
    {
        "id": "artist410",
        "name": "Diana Franco"
    },
    {
        "id": "artist411",
        "name": "Diana Vick"
    },
    {
        "id": "artist412",
        "name": "Dibujante Nocturno"
    },
    {
        "id": "artist413",
        "name": "Diego Andrade"
    },
    {
        "id": "artist414",
        "name": "Diego Gisbert"
    },
    {
        "id": "artist415",
        "name": "Diesel"
    },
    {
        "id": "artist416",
        "name": "Dimitar Marinski"
    },
    {
        "id": "artist417",
        "name": "Ding Songjian"
    },
    {
        "id": "artist418",
        "name": "DiTerlizzi"
    },
    {
        "id": "artist419",
        "name": "D. J. Cleland-Hura"
    },
    {
        "id": "artist420",
        "name": "Dmitriy Mironov"
    },
    {
        "id": "artist421",
        "name": "Dmitry Burmak"
    },
    {
        "id": "artist422",
        "name": "Dom!"
    },
    {
        "id": "artist423",
        "name": "Domco."
    },
    {
        "id": "artist424",
        "name": "Domenico Cava"
    },
    {
        "id": "artist425",
        "name": "Dominick Domingo"
    },
    {
        "id": "artist426",
        "name": "Dominik Mayer"
    },
    {
        "id": "artist427",
        "name": "Donato Giancola"
    },
    {
        "id": "artist428",
        "name": "Don Hazeltine"
    },
    {
        "id": "artist429",
        "name": "Don Thompson"
    },
    {
        "id": "artist430",
        "name": "Doodleskelly"
    },
    {
        "id": "artist431",
        "name": "Doug Chaffee"
    },
    {
        "id": "artist432",
        "name": "Doug Keith"
    },
    {
        "id": "artist433",
        "name": "Douglas Shuler"
    },
    {
        "id": "artist434",
        "name": "Drew Baker"
    },
    {
        "id": "artist435",
        "name": "Drew Moss"
    },
    {
        "id": "artist436",
        "name": "Drew Tucker"
    },
    {
        "id": "artist437",
        "name": "D-suzuki"
    },
    {
        "id": "artist438",
        "name": "Durion"
    },
    {
        "id": "artist439",
        "name": "DXTR"
    },
    {
        "id": "artist440",
        "name": "Dylan Martens"
    },
    {
        "id": "artist441",
        "name": "DZO"
    },
    {
        "id": "artist442",
        "name": "Ebila"
    },
    {
        "id": "artist443",
        "name": "Eddie Mendoza"
    },
    {
        "id": "artist444",
        "name": "Eddie Schillo"
    },
    {
        "id": "artist445",
        "name": "Edgar Sánchez Hidalgo"
    },
    {
        "id": "artist446",
        "name": "Ed Repka"
    },
    {
        "id": "artist447",
        "name": "Eduardo Francisco"
    },
    {
        "id": "artist448",
        "name": "Edward P. Beard, Jr."
    },
    {
        "id": "artist449",
        "name": "Eelis Kyttanen"
    },
    {
        "id": "artist450",
        "name": "Efflam Mercier"
    },
    {
        "id": "artist451",
        "name": "Efrem Palacios"
    },
    {
        "id": "artist452",
        "name": "Eilene Cherie"
    },
    {
        "id": "artist453",
        "name": "Ejiwa \"Edge\" Ebenebe"
    },
    {
        "id": "artist454",
        "name": "Ekaterina Burmak"
    },
    {
        "id": "artist455",
        "name": "Elektrodeko"
    },
    {
        "id": "artist456",
        "name": "Eli, age 8"
    },
    {
        "id": "artist457",
        "name": "Eliette Mitchell"
    },
    {
        "id": "artist458",
        "name": "Eli Minaya"
    },
    {
        "id": "artist459",
        "name": "Eli Shiffrin"
    },
    {
        "id": "artist460",
        "name": "Elizabeth Peiró"
    },
    {
        "id": "artist461",
        "name": "Eliz Roxs"
    },
    {
        "id": "artist462",
        "name": "ELK64"
    },
    {
        "id": "artist463",
        "name": "Ellie Livingston"
    },
    {
        "id": "artist464",
        "name": "Elliot Stevens"
    },
    {
        "id": "artist465",
        "name": "Ema Gaspar"
    },
    {
        "id": "artist466",
        "name": "E. M. Gist"
    },
    {
        "id": "artist467",
        "name": "Emily Maltby"
    },
    {
        "id": "artist468",
        "name": "Emily Teng"
    },
    {
        "id": "artist469",
        "name": "Emmanuel Shiu"
    },
    {
        "id": "artist470",
        "name": "Emma Rios"
    },
    {
        "id": "artist471",
        "name": "Emrah Elmasli"
    },
    {
        "id": "artist472",
        "name": "Erica Williams"
    },
    {
        "id": "artist473",
        "name": "Erica Yang"
    },
    {
        "id": "artist474",
        "name": "Eric David Anderson"
    },
    {
        "id": "artist475",
        "name": "Eric Deschamps"
    },
    {
        "id": "artist476",
        "name": "Eric Fortune"
    },
    {
        "id": "artist477",
        "name": "Eric Peterson"
    },
    {
        "id": "artist478",
        "name": "Eric Polak"
    },
    {
        "id": "artist479",
        "name": "Eric Velhagen"
    },
    {
        "id": "artist480",
        "name": "Eric Wilkerson"
    },
    {
        "id": "artist481",
        "name": "Erikas Perl"
    },
    {
        "id": "artist482",
        "name": "Erin Vest"
    },
    {
        "id": "artist483",
        "name": "Erion Makuo"
    },
    {
        "id": "artist484",
        "name": "Ernanda Souza"
    },
    {
        "id": "artist485",
        "name": "Erol Otus"
    },
    {
        "id": "artist486",
        "name": "Esad Ribic"
    },
    {
        "id": "artist487",
        "name": "Eshpur"
    },
    {
        "id": "artist488",
        "name": "Esuthio"
    },
    {
        "id": "artist489",
        "name": "Ethan Fleischer"
    },
    {
        "id": "artist490",
        "name": "Eugene Frost"
    },
    {
        "id": "artist491",
        "name": "Eva Eskelinen"
    },
    {
        "id": "artist492",
        "name": "Evan Cagle"
    },
    {
        "id": "artist493",
        "name": "Evan Shipard"
    },
    {
        "id": "artist494",
        "name": "Even Amundsen"
    },
    {
        "id": "artist495",
        "name": "Evyn Fong"
    },
    {
        "id": "artist496",
        "name": "Eytan Zana"
    },
    {
        "id": "artist497",
        "name": "Ezoi"
    },
    {
        "id": "artist498",
        "name": "Fajareka Setiawan"
    },
    {
        "id": "artist499",
        "name": "Fang Xinyu"
    },
    {
        "id": "artist500",
        "name": "Fang Yue"
    },
    {
        "id": "artist501",
        "name": "Fariba Khamseh"
    },
    {
        "id": "artist502",
        "name": "Fay Dalton"
    },
    {
        "id": "artist503",
        "name": "Fay Jones"
    },
    {
        "id": "artist504",
        "name": "Feifei Ruan"
    },
    {
        "id": "artist505",
        "name": "Felipe Martini"
    },
    {
        "id": "artist506",
        "name": "Fernando Falcone"
    },
    {
        "id": "artist507",
        "name": "Fesbra"
    },
    {
        "id": "artist508",
        "name": "Filip Burburan"
    },
    {
        "id": "artist509",
        "name": "Filipe Pagliuso"
    },
    {
        "id": "artist510",
        "name": "Finnian MacManus"
    },
    {
        "id": "artist511",
        "name": "Fiona Hsieh"
    },
    {
        "id": "artist512",
        "name": "Fiona Staples"
    },
    {
        "id": "artist513",
        "name": "Flavio Girón"
    },
    {
        "id": "artist514",
        "name": "Flavio Greco Paglia"
    },
    {
        "id": "artist515",
        "name": "Florey"
    },
    {
        "id": "artist516",
        "name": "Florian Bertmer"
    },
    {
        "id": "artist517",
        "name": "Florian de Gesincourt"
    },
    {
        "id": "artist518",
        "name": "Florin Petre Bostan"
    },
    {
        "id": "artist519",
        "name": "Foo Midori"
    },
    {
        "id": "artist520",
        "name": "Forrest Imel"
    },
    {
        "id": "artist521",
        "name": "Forrest Schehl"
    },
    {
        "id": "artist522",
        "name": "Francesca Baerald"
    },
    {
        "id": "artist523",
        "name": "Francesca Resta"
    },
    {
        "id": "artist524",
        "name": "Francisco Badilla"
    },
    {
        "id": "artist525",
        "name": "Francisco Martin"
    },
    {
        "id": "artist526",
        "name": "Francisco Miyara"
    },
    {
        "id": "artist527",
        "name": "Francis Tneh"
    },
    {
        "id": "artist528",
        "name": "Francis Tsai"
    },
    {
        "id": "artist529",
        "name": "Francois Dery"
    },
    {
        "id": "artist530",
        "name": "Franco Tempesta"
    },
    {
        "id": "artist531",
        "name": "Francoyovich"
    },
    {
        "id": "artist532",
        "name": "Frank Frazetta"
    },
    {
        "id": "artist533",
        "name": "Frank Kelly Freas"
    },
    {
        "id": "artist534",
        "name": "Franz Vohwinkel"
    },
    {
        "id": "artist535",
        "name": "Fred Fields"
    },
    {
        "id": "artist536",
        "name": "Fred Harper"
    },
    {
        "id": "artist537",
        "name": "Fred Hooper"
    },
    {
        "id": "artist538",
        "name": "Fred Rahmqvist"
    },
    {
        "id": "artist539",
        "name": "Fukuzo Katsura"
    },
    {
        "id": "artist540",
        "name": "Fuzichoco"
    },
    {
        "id": "artist541",
        "name": "Gaboleps"
    },
    {
        "id": "artist542",
        "name": "Gabor Szikszai"
    },
    {
        "id": "artist543",
        "name": "Gabriela Birchal"
    },
    {
        "id": "artist544",
        "name": "Gabriel Tanko"
    },
    {
        "id": "artist545",
        "name": "Gaga Zeng"
    },
    {
        "id": "artist546",
        "name": "Gage Lindsten"
    },
    {
        "id": "artist547",
        "name": "Galen Dara"
    },
    {
        "id": "artist548",
        "name": "Games Workshop"
    },
    {
        "id": "artist549",
        "name": "Gao Jianzhang"
    },
    {
        "id": "artist550",
        "name": "Gao Yan"
    },
    {
        "id": "artist551",
        "name": "Gary Baseman"
    },
    {
        "id": "artist552",
        "name": "Gary Gianni"
    },
    {
        "id": "artist553",
        "name": "Gary Leach"
    },
    {
        "id": "artist554",
        "name": "Gary Ruddell"
    },
    {
        "id": "artist555",
        "name": "Gavin Verhey"
    },
    {
        "id": "artist556",
        "name": "Geofrey Darrow"
    },
    {
        "id": "artist557",
        "name": "George Fan"
    },
    {
        "id": "artist558",
        "name": "George Pratt"
    },
    {
        "id": "artist559",
        "name": "Gerry Grace"
    },
    {
        "id": "artist560",
        "name": "G-host Lee"
    },
    {
        "id": "artist561",
        "name": "Giacomo Galloni"
    },
    {
        "id": "artist562",
        "name": "Gina Matarazzo"
    },
    {
        "id": "artist563",
        "name": "Gintas Galvanauskas"
    },
    {
        "id": "artist564",
        "name": "Glen Angus"
    },
    {
        "id": "artist565",
        "name": "Glenn Fabry"
    },
    {
        "id": "artist566",
        "name": "Glenn Jones"
    },
    {
        "id": "artist567",
        "name": "GodMachine"
    },
    {
        "id": "artist568",
        "name": "Gomzé"
    },
    {
        "id": "artist569",
        "name": "Gonçalo Pereira"
    },
    {
        "id": "artist570",
        "name": "Goñi Montes"
    },
    {
        "id": "artist571",
        "name": "Goran Josic"
    },
    {
        "id": "artist572",
        "name": "Gossip Goblin"
    },
    {
        "id": "artist573",
        "name": "Gou Tanabe"
    },
    {
        "id": "artist574",
        "name": "Gozz"
    },
    {
        "id": "artist575",
        "name": "Grady Frederick"
    },
    {
        "id": "artist576",
        "name": "Graeme Hopkins"
    },
    {
        "id": "artist577",
        "name": "GrafitArt"
    },
    {
        "id": "artist578",
        "name": "Graham Yarrington"
    },
    {
        "id": "artist579",
        "name": "Grant Griffin"
    },
    {
        "id": "artist580",
        "name": "Greg Bell"
    },
    {
        "id": "artist581",
        "name": "Greg Bobrowski"
    },
    {
        "id": "artist582",
        "name": "Greg Hildebrandt"
    },
    {
        "id": "artist583",
        "name": "Greg Opalinski"
    },
    {
        "id": "artist584",
        "name": "Greg Simanson"
    },
    {
        "id": "artist585",
        "name": "Greg Spalenka"
    },
    {
        "id": "artist586",
        "name": "Greg Staples"
    },
    {
        "id": "artist587",
        "name": "Grzegorz Rutkowski"
    },
    {
        "id": "artist588",
        "name": "Guga Baraldi"
    },
    {
        "id": "artist589",
        "name": "Hagiya Kaoru"
    },
    {
        "id": "artist590",
        "name": "Haku Tatsufuchi"
    },
    {
        "id": "artist591",
        "name": "Halil Ural"
    },
    {
        "id": "artist592",
        "name": "Hank Reavis"
    },
    {
        "id": "artist593",
        "name": "Hannibal King"
    },
    {
        "id": "artist594",
        "name": "Hanspeter Ziegler"
    },
    {
        "id": "artist595",
        "name": "Hari & Deepti"
    },
    {
        "id": "artist596",
        "name": "Harold McNeill"
    },
    {
        "id": "artist597",
        "name": "Harpreet Rattan"
    },
    {
        "id": "artist598",
        "name": "Harry Conway"
    },
    {
        "id": "artist599",
        "name": "Hatori Kyoka"
    },
    {
        "id": "artist600",
        "name": "Heather Hudson"
    },
    {
        "id": "artist601",
        "name": "Hector Ortiz"
    },
    {
        "id": "artist602",
        "name": "Heiko Mueller"
    },
    {
        "id": "artist603",
        "name": "He Jiancheng"
    },
    {
        "id": "artist604",
        "name": "Helge C. Balzer"
    },
    {
        "id": "artist605",
        "name": "Hélio Frazão"
    },
    {
        "id": "artist606",
        "name": "Helvetica Blanc"
    },
    {
        "id": "artist607",
        "name": "Hendry Iwanaga"
    },
    {
        "id": "artist608",
        "name": "Henry G. Higginbotham"
    },
    {
        "id": "artist609",
        "name": "Henry Peters"
    },
    {
        "id": "artist610",
        "name": "Henry Van Der Linde"
    },
    {
        "id": "artist611",
        "name": "Heonhwa Choe"
    },
    {
        "id": "artist612",
        "name": "Hideaki Takamura"
    },
    {
        "id": "artist613",
        "name": "Hillary Wilson"
    },
    {
        "id": "artist614",
        "name": "Hiro Izawa"
    },
    {
        "id": "artist615",
        "name": "Hirokorin"
    },
    {
        "id": "artist616",
        "name": "Hiromu"
    },
    {
        "id": "artist617",
        "name": "Hiro Suda"
    },
    {
        "id": "artist618",
        "name": "Hiro Usuda"
    },
    {
        "id": "artist619",
        "name": "Hisashi Momose"
    },
    {
        "id": "artist620",
        "name": "Hitowa"
    },
    {
        "id": "artist621",
        "name": "Hongtae Taecholarn"
    },
    {
        "id": "artist622",
        "name": "Hong Yan"
    },
    {
        "id": "artist623",
        "name": "Howard Lyon"
    },
    {
        "id": "artist624",
        "name": "Hozan Shinomaru"
    },
    {
        "id": "artist625",
        "name": "Hristo D. Chukov"
    },
    {
        "id": "artist626",
        "name": "Huang Qishi"
    },
    {
        "id": "artist627",
        "name": "Hugh Jamieson"
    },
    {
        "id": "artist628",
        "name": "Hung Nguy"
    },
    {
        "id": "artist629",
        "name": "Hyan Tran, age 6"
    },
    {
        "id": "artist630",
        "name": "Iain McCaig"
    },
    {
        "id": "artist631",
        "name": "Ian Edward Ameling"
    },
    {
        "id": "artist632",
        "name": "Ian Jepson"
    },
    {
        "id": "artist633",
        "name": "Ian Miller"
    },
    {
        "id": "artist634",
        "name": "Ichiko Milk Tei"
    },
    {
        "id": "artist635",
        "name": "Iga Oliwiak"
    },
    {
        "id": "artist636",
        "name": "Ignatius Budi"
    },
    {
        "id": "artist637",
        "name": "Ignis Bruno"
    },
    {
        "id": "artist638",
        "name": "Igor Grechanyi"
    },
    {
        "id": "artist639",
        "name": "Igor Kieryluk"
    },
    {
        "id": "artist640",
        "name": "Igor Krstic"
    },
    {
        "id": "artist641",
        "name": "Iinuma Yuuki"
    },
    {
        "id": "artist642",
        "name": "I☆LA"
    },
    {
        "id": "artist643",
        "name": "Ilker Yildiz"
    },
    {
        "id": "artist644",
        "name": "Illustranesia"
    },
    {
        "id": "artist645",
        "name": "Ilse Gort"
    },
    {
        "id": "artist646",
        "name": "Ina Wong"
    },
    {
        "id": "artist647",
        "name": "Indra Nugroho"
    },
    {
        "id": "artist648",
        "name": "Inka Schulz"
    },
    {
        "id": "artist649",
        "name": "Inkognit"
    },
    {
        "id": "artist650",
        "name": "Inoue Junichi"
    },
    {
        "id": "artist651",
        "name": "Inuchiyo Meimaru"
    },
    {
        "id": "artist652",
        "name": "Ioan Dumitrescu"
    },
    {
        "id": "artist653",
        "name": "Ioannis Fiore"
    },
    {
        "id": "artist654",
        "name": "Ionomycin"
    },
    {
        "id": "artist655",
        "name": "I. Rabarot"
    },
    {
        "id": "artist656",
        "name": "Ira Humphrey"
    },
    {
        "id": "artist657",
        "name": "Irina Nordsol"
    },
    {
        "id": "artist658",
        "name": "Iris Compiet"
    },
    {
        "id": "artist659",
        "name": "Ironbrush"
    },
    {
        "id": "artist660",
        "name": "Irvin Rodriguez"
    },
    {
        "id": "artist661",
        "name": "Ishikawa Kenta"
    },
    {
        "id": "artist662",
        "name": "Isis"
    },
    {
        "id": "artist663",
        "name": "Issei Murakami"
    },
    {
        "id": "artist664",
        "name": "Ittoku"
    },
    {
        "id": "artist665",
        "name": "Ivan Dedov"
    },
    {
        "id": "artist666",
        "name": "Ivan Shavrin"
    },
    {
        "id": "artist667",
        "name": "Izumi Tomoki"
    },
    {
        "id": "artist668",
        "name": "Izzy"
    },
    {
        "id": "artist669",
        "name": "Jabari Weathers"
    },
    {
        "id": "artist670",
        "name": "Jack Hughes"
    },
    {
        "id": "artist671",
        "name": "Jackson Epstein"
    },
    {
        "id": "artist672",
        "name": "Jack Teagle"
    },
    {
        "id": "artist673",
        "name": "Jack Wang"
    },
    {
        "id": "artist674",
        "name": "Jack Wei"
    },
    {
        "id": "artist675",
        "name": "Jacob Nourigat"
    },
    {
        "id": "artist676",
        "name": "Jacques Bredy"
    },
    {
        "id": "artist677",
        "name": "Jade Granger"
    },
    {
        "id": "artist678",
        "name": "Jae Lee"
    },
    {
        "id": "artist679",
        "name": "Jaime A. Zuverza"
    },
    {
        "id": "artist680",
        "name": "Jaime Jones"
    },
    {
        "id": "artist681",
        "name": "Jair Medina"
    },
    {
        "id": "artist682",
        "name": "Jake Murray"
    },
    {
        "id": "artist683",
        "name": "Jakob Eirich"
    },
    {
        "id": "artist684",
        "name": "Jakub Kasper"
    },
    {
        "id": "artist685",
        "name": "Jakub Rebelka"
    },
    {
        "id": "artist686",
        "name": "Jama Jurabaev"
    },
    {
        "id": "artist687",
        "name": "James Allen"
    },
    {
        "id": "artist688",
        "name": "James Arnold"
    },
    {
        "id": "artist689",
        "name": "James Bernardin"
    },
    {
        "id": "artist690",
        "name": "James Bousema"
    },
    {
        "id": "artist691",
        "name": "James Ernest"
    },
    {
        "id": "artist692",
        "name": "James Kei"
    },
    {
        "id": "artist693",
        "name": "James Kooi"
    },
    {
        "id": "artist694",
        "name": "James Paick"
    },
    {
        "id": "artist695",
        "name": "James Rose"
    },
    {
        "id": "artist696",
        "name": "James Ryman"
    },
    {
        "id": "artist697",
        "name": "James Wong"
    },
    {
        "id": "artist698",
        "name": "James Zapata"
    },
    {
        "id": "artist699",
        "name": "Jamroz Gary"
    },
    {
        "id": "artist700",
        "name": "Jana Heidersdorf"
    },
    {
        "id": "artist701",
        "name": "Jana Schirmer"
    },
    {
        "id": "artist702",
        "name": "Janet Aulisio"
    },
    {
        "id": "artist703",
        "name": "Janine Johnston"
    },
    {
        "id": "artist704",
        "name": "Jared Blando"
    },
    {
        "id": "artist705",
        "name": "Jarel Threat"
    },
    {
        "id": "artist706",
        "name": "Jaroslav Kosmina"
    },
    {
        "id": "artist707",
        "name": "Jarreau Wimberly"
    },
    {
        "id": "artist708",
        "name": "Jason A. Engle"
    },
    {
        "id": "artist709",
        "name": "Jason Alexander Behnke"
    },
    {
        "id": "artist710",
        "name": "Jason Chan"
    },
    {
        "id": "artist711",
        "name": "Jason Felix"
    },
    {
        "id": "artist712",
        "name": "Jason Kang"
    },
    {
        "id": "artist713",
        "name": "Jason Li"
    },
    {
        "id": "artist714",
        "name": "Jason Rainville"
    },
    {
        "id": "artist715",
        "name": "Jason Smith"
    },
    {
        "id": "artist716",
        "name": "Jasper Sandner"
    },
    {
        "id": "artist717",
        "name": "Javier Charro"
    },
    {
        "id": "artist718",
        "name": "Jay Ryan"
    },
    {
        "id": "artist719",
        "name": "JB Casacop"
    },
    {
        "id": "artist720",
        "name": "jD"
    },
    {
        "id": "artist721",
        "name": "Jean-Christophe Drolet"
    },
    {
        "id": "artist722",
        "name": "Jeanne D'Angelo"
    },
    {
        "id": "artist723",
        "name": "Jeannie L Paske"
    },
    {
        "id": "artist724",
        "name": "Jean-Sébastien Rossbach"
    },
    {
        "id": "artist725",
        "name": "Jedd Chevrier"
    },
    {
        "id": "artist726",
        "name": "Jeff A. Menges"
    },
    {
        "id": "artist727",
        "name": "Jeff Carpenter"
    },
    {
        "id": "artist728",
        "name": "Jeff Dee"
    },
    {
        "id": "artist729",
        "name": "Jeff Easley"
    },
    {
        "id": "artist730",
        "name": "Jeff Laubenstein"
    },
    {
        "id": "artist731",
        "name": "Jeff Miracola"
    },
    {
        "id": "artist732",
        "name": "Jeff Nentrup"
    },
    {
        "id": "artist733",
        "name": "Jeff Reitz"
    },
    {
        "id": "artist734",
        "name": "Jeff Remmer"
    },
    {
        "id": "artist735",
        "name": "Jeffrey R. Busch"
    },
    {
        "id": "artist736",
        "name": "Jeff Simpson"
    },
    {
        "id": "artist737",
        "name": "Jeff Soto"
    },
    {
        "id": "artist738",
        "name": "Jeff Stewart"
    },
    {
        "id": "artist739",
        "name": "Jehan Choo"
    },
    {
        "id": "artist740",
        "name": "Jen Bartel"
    },
    {
        "id": "artist741",
        "name": "Jennie Kim"
    },
    {
        "id": "artist742",
        "name": "Jennifer Law"
    },
    {
        "id": "artist743",
        "name": "Jennifer L. Meyer"
    },
    {
        "id": "artist744",
        "name": "Jen Page"
    },
    {
        "id": "artist745",
        "name": "Jérémie Solomon"
    },
    {
        "id": "artist746",
        "name": "Jeremy Enecio"
    },
    {
        "id": "artist747",
        "name": "Jeremy Jarvis"
    },
    {
        "id": "artist748",
        "name": "Jeremy Paillotin"
    },
    {
        "id": "artist749",
        "name": "Jeremy Wilson"
    },
    {
        "id": "artist750",
        "name": "Jermaine Rogers"
    },
    {
        "id": "artist751",
        "name": "Jerry Tiritilli"
    },
    {
        "id": "artist752",
        "name": "Jesper Ejsing"
    },
    {
        "id": "artist753",
        "name": "Jesper Myrfors"
    },
    {
        "id": "artist754",
        "name": "Jesse LeDoux"
    },
    {
        "id": "artist755",
        "name": "Jessica Fong"
    },
    {
        "id": "artist756",
        "name": "Jessica Rossier"
    },
    {
        "id": "artist757",
        "name": "Jessica Seamans"
    },
    {
        "id": "artist758",
        "name": "Jessie Lam"
    },
    {
        "id": "artist759",
        "name": "Jiachen Tao"
    },
    {
        "id": "artist760",
        "name": "Jiaming"
    },
    {
        "id": "artist761",
        "name": "Jiang Zhuqing"
    },
    {
        "id": "artist762",
        "name": "JiHun Lee"
    },
    {
        "id": "artist763",
        "name": "Jim Murray"
    },
    {
        "id": "artist764",
        "name": "Jim Nelson"
    },
    {
        "id": "artist765",
        "name": "Jim Pavelec"
    },
    {
        "id": "artist766",
        "name": "Jinho Bae"
    },
    {
        "id": "artist767",
        "name": "Jintetsu"
    },
    {
        "id": "artist768",
        "name": "Ji Yong"
    },
    {
        "id": "artist769",
        "name": "J.Lonnee"
    },
    {
        "id": "artist770",
        "name": "Joana LaFuente"
    },
    {
        "id": "artist771",
        "name": "Joao Ruas"
    },
    {
        "id": "artist772",
        "name": "Jock"
    },
    {
        "id": "artist773",
        "name": "Jodie Muir"
    },
    {
        "id": "artist774",
        "name": "Jody Clark"
    },
    {
        "id": "artist775",
        "name": "Joe Esposito"
    },
    {
        "id": "artist776",
        "name": "Joel Biske"
    },
    {
        "id": "artist777",
        "name": "Joel Thomas"
    },
    {
        "id": "artist778",
        "name": "Joe Slucher"
    },
    {
        "id": "artist779",
        "name": "Joe Torra"
    },
    {
        "id": "artist780",
        "name": "Johan Grenier"
    },
    {
        "id": "artist781",
        "name": "Johann Bodin"
    },
    {
        "id": "artist782",
        "name": "Johannes Mücke"
    },
    {
        "id": "artist783",
        "name": "Johannes Voss"
    },
    {
        "id": "artist784",
        "name": "John Avon"
    },
    {
        "id": "artist785",
        "name": "John Bolton"
    },
    {
        "id": "artist786",
        "name": "John Coulthart"
    },
    {
        "id": "artist787",
        "name": "John Darnielle"
    },
    {
        "id": "artist788",
        "name": "John Di Giovanni"
    },
    {
        "id": "artist789",
        "name": "John Donahue"
    },
    {
        "id": "artist790",
        "name": "John F. Malta"
    },
    {
        "id": "artist791",
        "name": "John Franklin Howe"
    },
    {
        "id": "artist792",
        "name": "John Gallagher"
    },
    {
        "id": "artist793",
        "name": "John Howe"
    },
    {
        "id": "artist794",
        "name": "John Malloy"
    },
    {
        "id": "artist795",
        "name": "John Matson"
    },
    {
        "id": "artist796",
        "name": "John Penick"
    },
    {
        "id": "artist797",
        "name": "John Severin Brassell"
    },
    {
        "id": "artist798",
        "name": "John Silva"
    },
    {
        "id": "artist799",
        "name": "John Stanko"
    },
    {
        "id": "artist800",
        "name": "John Tedrick"
    },
    {
        "id": "artist801",
        "name": "John Thacker"
    },
    {
        "id": "artist802",
        "name": "John Zeleznik"
    },
    {
        "id": "artist803",
        "name": "Jokubas Uogintas"
    },
    {
        "id": "artist804",
        "name": "Jonas De Ro"
    },
    {
        "id": "artist805",
        "name": "Jonathan Kuo"
    },
    {
        "id": "artist806",
        "name": "Jon Foster"
    },
    {
        "id": "artist807",
        "name": "Jon J Muth"
    },
    {
        "id": "artist808",
        "name": "Jon Juarez"
    },
    {
        "id": "artist809",
        "name": "Jon Neimeister"
    },
    {
        "id": "artist810",
        "name": "Jon Vermilyea"
    },
    {
        "id": "artist811",
        "name": "Jordan Speer"
    },
    {
        "id": "artist812",
        "name": "Jorge Gutierrez Garcia"
    },
    {
        "id": "artist813",
        "name": "Jorge Jacinto"
    },
    {
        "id": "artist814",
        "name": "Jose Cabrera"
    },
    {
        "id": "artist815",
        "name": "José Parodi"
    },
    {
        "id": "artist816",
        "name": "Joseph Meehan"
    },
    {
        "id": "artist817",
        "name": "Joseph Weston"
    },
    {
        "id": "artist818",
        "name": "Josh Corpuz"
    },
    {
        "id": "artist819",
        "name": "Josh Hass"
    },
    {
        "id": "artist820",
        "name": "Josh Newton"
    },
    {
        "id": "artist821",
        "name": "Josh Thomas"
    },
    {
        "id": "artist822",
        "name": "Joshua Alvarado"
    },
    {
        "id": "artist823",
        "name": "Joshua Cairos"
    },
    {
        "id": "artist824",
        "name": "Joshua Hagler"
    },
    {
        "id": "artist825",
        "name": "Joshua Howard"
    },
    {
        "id": "artist826",
        "name": "Joshua Raphael"
    },
    {
        "id": "artist827",
        "name": "Josiah \"Jo\" Cameron"
    },
    {
        "id": "artist828",
        "name": "Josu Hernaiz"
    },
    {
        "id": "artist829",
        "name": "Josu Solano"
    },
    {
        "id": "artist830",
        "name": "Joy Ang"
    },
    {
        "id": "artist831",
        "name": "JOZ"
    },
    {
        "id": "artist832",
        "name": "J.P. Targete"
    },
    {
        "id": "artist833",
        "name": "JRZ251"
    },
    {
        "id": "artist834",
        "name": "Jubilee"
    },
    {
        "id": "artist835",
        "name": "Julia Griffin"
    },
    {
        "id": "artist836",
        "name": "Julia Metzger"
    },
    {
        "id": "artist837",
        "name": "Julian Kok Joon Wen"
    },
    {
        "id": "artist838",
        "name": "Julia Vasilyeva"
    },
    {
        "id": "artist839",
        "name": "Julie Baroh"
    },
    {
        "id": "artist840",
        "name": "Julie Bell"
    },
    {
        "id": "artist841",
        "name": "Julie Dillon"
    },
    {
        "id": "artist842",
        "name": "Julio Reyna"
    },
    {
        "id": "artist843",
        "name": "Jul Quanouai"
    },
    {
        "id": "artist844",
        "name": "Jung Park"
    },
    {
        "id": "artist845",
        "name": "JungShan"
    },
    {
        "id": "artist846",
        "name": "Junior Tomlin"
    },
    {
        "id": "artist847",
        "name": "Junji Ito"
    },
    {
        "id": "artist848",
        "name": "Junko Taguchi"
    },
    {
        "id": "artist849",
        "name": "Jurijus Chitrovas"
    },
    {
        "id": "artist850",
        "name": "Justin Cornell"
    },
    {
        "id": "artist851",
        "name": "Justine Cruz"
    },
    {
        "id": "artist852",
        "name": "Justine Jones"
    },
    {
        "id": "artist853",
        "name": "Justine Mara Andersen"
    },
    {
        "id": "artist854",
        "name": "Justin Gerard"
    },
    {
        "id": "artist855",
        "name": "Justin Hampton"
    },
    {
        "id": "artist856",
        "name": "Justin Hernandez"
    },
    {
        "id": "artist857",
        "name": "Justin Murray"
    },
    {
        "id": "artist858",
        "name": "Justin Norman"
    },
    {
        "id": "artist859",
        "name": "Justin Sweet"
    },
    {
        "id": "artist860",
        "name": "Justyna Dura"
    },
    {
        "id": "artist861",
        "name": "J. W. Frost"
    },
    {
        "id": "artist862",
        "name": "Kai Carpenter"
    },
    {
        "id": "artist863",
        "name": "Kaida Yuji"
    },
    {
        "id": "artist864",
        "name": "Kaitlyn McCulley"
    },
    {
        "id": "artist865",
        "name": "Kaja Foglio"
    },
    {
        "id": "artist866",
        "name": "Kamila Szutenberg"
    },
    {
        "id": "artist867",
        "name": "Kang Yu"
    },
    {
        "id": "artist868",
        "name": "Kaoru Yukishiro"
    },
    {
        "id": "artist869",
        "name": "Karen Hallion"
    },
    {
        "id": "artist870",
        "name": "Kari Christensen"
    },
    {
        "id": "artist871",
        "name": "Kari Johnson"
    },
    {
        "id": "artist872",
        "name": "Karla Ortiz"
    },
    {
        "id": "artist873",
        "name": "Karl Kopinski"
    },
    {
        "id": "artist874",
        "name": "Karmazid"
    },
    {
        "id": "artist875",
        "name": "Karuta Shiki"
    },
    {
        "id": "artist876",
        "name": "Kasia 'Kafis' Zielińska"
    },
    {
        "id": "artist877",
        "name": "Katerina Ladon"
    },
    {
        "id": "artist878",
        "name": "Kathleen Neeley"
    },
    {
        "id": "artist879",
        "name": "Kathryn Rathke"
    },
    {
        "id": "artist880",
        "name": "Katie Allison"
    },
    {
        "id": "artist881",
        "name": "Kato Ayaka"
    },
    {
        "id": "artist882",
        "name": "Kawasumi"
    },
    {
        "id": "artist883",
        "name": "Kee Lo"
    },
    {
        "id": "artist884",
        "name": "Keiji Hida"
    },
    {
        "id": "artist885",
        "name": "Keith Garletts"
    },
    {
        "id": "artist886",
        "name": "Keith Parkinson"
    },
    {
        "id": "artist887",
        "name": "Kekai Kotaki"
    },
    {
        "id": "artist888",
        "name": "Kelly Hamilton"
    },
    {
        "id": "artist889",
        "name": "Kelly McBride"
    },
    {
        "id": "artist890",
        "name": "Kelogsloops"
    },
    {
        "id": "artist891",
        "name": "Kemonomichi"
    },
    {
        "id": "artist892",
        "name": "Ken Meyer, Jr."
    },
    {
        "id": "artist893",
        "name": "Ken Nagle"
    },
    {
        "id": "artist894",
        "name": "Kensuke Okabayashi"
    },
    {
        "id": "artist895",
        "name": "Kento Matsuura"
    },
    {
        "id": "artist896",
        "name": "KERA"
    },
    {
        "id": "artist897",
        "name": "Kerby Rosanes"
    },
    {
        "id": "artist898",
        "name": "Kerstin Kaman"
    },
    {
        "id": "artist899",
        "name": "Kev Brockschmidt"
    },
    {
        "id": "artist900",
        "name": "Kev Fang"
    },
    {
        "id": "artist901",
        "name": "Kevin Dobler"
    },
    {
        "id": "artist902",
        "name": "Kevin Dubell"
    },
    {
        "id": "artist903",
        "name": "Kevin Gnutzmans"
    },
    {
        "id": "artist904",
        "name": "Kevin McCann"
    },
    {
        "id": "artist905",
        "name": "Kevin Murphy"
    },
    {
        "id": "artist906",
        "name": "Kevin Sidharta"
    },
    {
        "id": "artist907",
        "name": "Kevin Soler"
    },
    {
        "id": "artist908",
        "name": "Kevin Yee"
    },
    {
        "id": "artist909",
        "name": "Kev Walker"
    },
    {
        "id": "artist910",
        "name": "Khang Le"
    },
    {
        "id": "artist911",
        "name": "Khurrum"
    },
    {
        "id": "artist912",
        "name": "Kieran Yanner"
    },
    {
        "id": "artist913",
        "name": "Kim Dingwall"
    },
    {
        "id": "artist914",
        "name": "Kimonas Theodossiou"
    },
    {
        "id": "artist915",
        "name": "Kim Sokol"
    },
    {
        "id": "artist916",
        "name": "Kipling West"
    },
    {
        "id": "artist917",
        "name": "Kira, age 5½"
    },
    {
        "id": "artist918",
        "name": "Kiritada"
    },
    {
        "id": "artist919",
        "name": "Kirsten Zirngibl"
    },
    {
        "id": "artist920",
        "name": "Kisung Koh"
    },
    {
        "id": "artist921",
        "name": "Kitt Lapeña"
    },
    {
        "id": "artist922",
        "name": "KIYA"
    },
    {
        "id": "artist923",
        "name": "kleinerHai"
    },
    {
        "id": "artist924",
        "name": "KNIIO"
    },
    {
        "id": "artist925",
        "name": "Kogan"
    },
    {
        "id": "artist926",
        "name": "Kohei Hayama"
    },
    {
        "id": "artist927",
        "name": "Koji"
    },
    {
        "id": "artist928",
        "name": "Koji Nishino"
    },
    {
        "id": "artist929",
        "name": "Konstantin Porubov"
    },
    {
        "id": "artist930",
        "name": "Kotakan"
    },
    {
        "id": "artist931",
        "name": "Kota Nakatsubo"
    },
    {
        "id": "artist932",
        "name": "kozyndan"
    },
    {
        "id": "artist933",
        "name": "Krharts"
    },
    {
        "id": "artist934",
        "name": "Kristen Bishop"
    },
    {
        "id": "artist935",
        "name": "Kristina Carroll"
    },
    {
        "id": "artist936",
        "name": "Kristina Collantes"
    },
    {
        "id": "artist937",
        "name": "Kuang Sheng"
    },
    {
        "id": "artist938",
        "name": "Kukka"
    },
    {
        "id": "artist939",
        "name": "Kunio Hagio"
    },
    {
        "id": "artist940",
        "name": "Kuregure"
    },
    {
        "id": "artist941",
        "name": "kutay"
    },
    {
        "id": "artist942",
        "name": "Ku Xueming"
    },
    {
        "id": "artist943",
        "name": "Lack"
    },
    {
        "id": "artist944",
        "name": "LA Draws"
    },
    {
        "id": "artist945",
        "name": "Lake Hurwitz"
    },
    {
        "id": "artist946",
        "name": "Lander Strijbol"
    },
    {
        "id": "artist947",
        "name": "Larissa Hasenheit"
    },
    {
        "id": "artist948",
        "name": "Larry Elmore"
    },
    {
        "id": "artist949",
        "name": "Larry MacDougall"
    },
    {
        "id": "artist950",
        "name": "Lars Grant-West"
    },
    {
        "id": "artist951",
        "name": "Laura Plansker"
    },
    {
        "id": "artist952",
        "name": "Laurel Austin"
    },
    {
        "id": "artist953",
        "name": "Lauren K. Cannon"
    },
    {
        "id": "artist954",
        "name": "Lauren YS"
    },
    {
        "id": "artist955",
        "name": "Lawrence Snelly"
    },
    {
        "id": "artist956",
        "name": "Laynes"
    },
    {
        "id": "artist957",
        "name": "Leanna Crossan"
    },
    {
        "id": "artist958",
        "name": "LeDania"
    },
    {
        "id": "artist959",
        "name": "Leesha Hannigan"
    },
    {
        "id": "artist960",
        "name": "Lena Zykova"
    },
    {
        "id": "artist961",
        "name": "Lenka Šimečková"
    },
    {
        "id": "artist962",
        "name": "Leonardo Borazio"
    },
    {
        "id": "artist963",
        "name": "Leonardo Santanna"
    },
    {
        "id": "artist964",
        "name": "Leon Tukker"
    },
    {
        "id": "artist965",
        "name": "Leroy Steinmann"
    },
    {
        "id": "artist966",
        "name": "Levi Parker"
    },
    {
        "id": "artist967",
        "name": "Lē Yamamura"
    },
    {
        "id": "artist968",
        "name": "LHQ"
    },
    {
        "id": "artist969",
        "name": "Liam Sharp"
    },
    {
        "id": "artist970",
        "name": "Liangliang Zhang"
    },
    {
        "id": "artist971",
        "name": "Lie Setiawan"
    },
    {
        "id": "artist972",
        "name": "Liiga Smilshkalne"
    },
    {
        "id": "artist973",
        "name": "Lindsey Look"
    },
    {
        "id": "artist974",
        "name": "Lin Yan"
    },
    {
        "id": "artist975",
        "name": "Lisa Heidhoff"
    },
    {
        "id": "artist976",
        "name": "Li Tie"
    },
    {
        "id": "artist977",
        "name": "Liu Jianjian"
    },
    {
        "id": "artist978",
        "name": "Liu Shangying"
    },
    {
        "id": "artist979",
        "name": "Lius Lasahido"
    },
    {
        "id": "artist980",
        "name": "Livia Prima"
    },
    {
        "id": "artist981",
        "name": "Li Wang"
    },
    {
        "id": "artist982",
        "name": "Li Xiaohua"
    },
    {
        "id": "artist983",
        "name": "Lixin Yin"
    },
    {
        "id": "artist984",
        "name": "Li Youliang"
    },
    {
        "id": "artist985",
        "name": "Li Yousong"
    },
    {
        "id": "artist986",
        "name": "Liz Danforth"
    },
    {
        "id": "artist987",
        "name": "Liz Leo"
    },
    {
        "id": "artist988",
        "name": "L J Koh"
    },
    {
        "id": "artist989",
        "name": "Logan Feliciano"
    },
    {
        "id": "artist990",
        "name": "Loïc Canavaggia"
    },
    {
        "id": "artist991",
        "name": "Lordigan"
    },
    {
        "id": "artist992",
        "name": "Lorenzo Lanfranconi"
    },
    {
        "id": "artist993",
        "name": "Lorenzo Mastroianni"
    },
    {
        "id": "artist994",
        "name": "Lou Harrison"
    },
    {
        "id": "artist995",
        "name": "Lubov"
    },
    {
        "id": "artist996",
        "name": "Lucas Firmino"
    },
    {
        "id": "artist997",
        "name": "Lucas Graciano"
    },
    {
        "id": "artist998",
        "name": "Lucas Staniec"
    },
    {
        "id": "artist999",
        "name": "Lucas Terryn"
    },
    {
        "id": "artist1000",
        "name": "Luca Zontini"
    },
    {
        "id": "artist1001",
        "name": "Lucio Parrillo"
    },
    {
        "id": "artist1002",
        "name": "Lucy Meaden"
    },
    {
        "id": "artist1003",
        "name": "Luisa J. Preissler"
    },
    {
        "id": "artist1004",
        "name": "Luis Esteves"
    },
    {
        "id": "artist1005",
        "name": "Lukas Litzsinger"
    },
    {
        "id": "artist1006",
        "name": "Luke Pearson"
    },
    {
        "id": "artist1007",
        "name": "Maaz Ali Khan"
    },
    {
        "id": "artist1008",
        "name": "Mab Graves"
    },
    {
        "id": "artist1009",
        "name": "Maciej Kuciara"
    },
    {
        "id": "artist1010",
        "name": "Maddie Julyk"
    },
    {
        "id": "artist1011",
        "name": "Madeline Boni"
    },
    {
        "id": "artist1012",
        "name": "Madison Mosley"
    },
    {
        "id": "artist1013",
        "name": "Mads Ahm"
    },
    {
        "id": "artist1014",
        "name": "Maekawa Yuichi"
    },
    {
        "id": "artist1015",
        "name": "Maël Ollivier-Henry"
    },
    {
        "id": "artist1016",
        "name": "Magali Villeneuve"
    },
    {
        "id": "artist1017",
        "name": "Magane Okuda"
    },
    {
        "id": "artist1018",
        "name": "Magnus Jansson"
    },
    {
        "id": "artist1019",
        "name": "Maihope"
    },
    {
        "id": "artist1020",
        "name": "Maiko Aoji"
    },
    {
        "id": "artist1021",
        "name": "Maiko Yoshizawa"
    },
    {
        "id": "artist1022",
        "name": "Mai Okuma"
    },
    {
        "id": "artist1023",
        "name": "Maji"
    },
    {
        "id": "artist1024",
        "name": "MAMEZAWA"
    },
    {
        "id": "artist1025",
        "name": "Mandy Jurgens"
    },
    {
        "id": "artist1026",
        "name": "Manuel Castañón"
    },
    {
        "id": "artist1027",
        "name": "Marc-André Dupont"
    },
    {
        "id": "artist1028",
        "name": "Marcela Bolívar"
    },
    {
        "id": "artist1029",
        "name": "Marcela Medeiros"
    },
    {
        "id": "artist1030",
        "name": "Marcelo Vignali"
    },
    {
        "id": "artist1031",
        "name": "Marc Fishman"
    },
    {
        "id": "artist1032",
        "name": "Marco Bucci"
    },
    {
        "id": "artist1033",
        "name": "Marco Dotti"
    },
    {
        "id": "artist1034",
        "name": "Marco Espinosa"
    },
    {
        "id": "artist1035",
        "name": "Marco Gorlei"
    },
    {
        "id": "artist1036",
        "name": "Marco Nelor"
    },
    {
        "id": "artist1037",
        "name": "Marco Teixeira"
    },
    {
        "id": "artist1038",
        "name": "Marco Wulfr"
    },
    {
        "id": "artist1039",
        "name": "Marc Simonetti"
    },
    {
        "id": "artist1040",
        "name": "Margaret Organ-Kean"
    },
    {
        "id": "artist1041",
        "name": "Maria Abagnale"
    },
    {
        "id": "artist1042",
        "name": "Mariah Tekulve"
    },
    {
        "id": "artist1043",
        "name": "Marianne Martin"
    },
    {
        "id": "artist1044",
        "name": "Maria Poliakova"
    },
    {
        "id": "artist1045",
        "name": "Maria Zolotukhina"
    },
    {
        "id": "artist1046",
        "name": "Marie Magny"
    },
    {
        "id": "artist1047",
        "name": "Marija Tiurina"
    },
    {
        "id": "artist1048",
        "name": "Marika Lord"
    },
    {
        "id": "artist1049",
        "name": "Marina Ortega Lorente"
    },
    {
        "id": "artist1050",
        "name": "Marion Kivits"
    },
    {
        "id": "artist1051",
        "name": "Marisa Oh"
    },
    {
        "id": "artist1052",
        "name": "Mark A. Nelson"
    },
    {
        "id": "artist1053",
        "name": "Mark Behm"
    },
    {
        "id": "artist1054",
        "name": "Mark Brill"
    },
    {
        "id": "artist1055",
        "name": "Mark Evans"
    },
    {
        "id": "artist1056",
        "name": "Mark Harrison"
    },
    {
        "id": "artist1057",
        "name": "Mark Heggen"
    },
    {
        "id": "artist1058",
        "name": "Mark Hyzer"
    },
    {
        "id": "artist1059",
        "name": "Mark L. Gottlieb"
    },
    {
        "id": "artist1060",
        "name": "Marko Manev"
    },
    {
        "id": "artist1061",
        "name": "Mark Poole"
    },
    {
        "id": "artist1062",
        "name": "Mark Price"
    },
    {
        "id": "artist1063",
        "name": "Mark Purvis"
    },
    {
        "id": "artist1064",
        "name": "Mark Riddick"
    },
    {
        "id": "artist1065",
        "name": "Mark Romanoski"
    },
    {
        "id": "artist1066",
        "name": "Mark Rosewater"
    },
    {
        "id": "artist1067",
        "name": "Mark Tedin"
    },
    {
        "id": "artist1068",
        "name": "Mark Winters"
    },
    {
        "id": "artist1069",
        "name": "Mark Zug"
    },
    {
        "id": "artist1070",
        "name": "Marlene Yui"
    },
    {
        "id": "artist1071",
        "name": "Marsha Rivera"
    },
    {
        "id": "artist1072",
        "name": "Marta Nael"
    },
    {
        "id": "artist1073",
        "name": "Martina Fačková"
    },
    {
        "id": "artist1074",
        "name": "Martin Ansin"
    },
    {
        "id": "artist1075",
        "name": "Martina Pilcerova"
    },
    {
        "id": "artist1076",
        "name": "Martin de Diego Sádaba"
    },
    {
        "id": "artist1077",
        "name": "Martin McKenna"
    },
    {
        "id": "artist1078",
        "name": "Martin Ontiveros"
    },
    {
        "id": "artist1079",
        "name": "Martin Wittfooth"
    },
    {
        "id": "artist1080",
        "name": "Maru Ferreira"
    },
    {
        "id": "artist1081",
        "name": "Mary Josberger"
    },
    {
        "id": "artist1082",
        "name": "Mary Kathryn Amiotte-Beaulieu"
    },
    {
        "id": "artist1083",
        "name": "Marzena Nereida Piwowar"
    },
    {
        "id": "artist1084",
        "name": "Masahiro Ito"
    },
    {
        "id": "artist1085",
        "name": "Massimilano Frezzato"
    },
    {
        "id": "artist1086",
        "name": "Massiveface"
    },
    {
        "id": "artist1087",
        "name": "Mateus Manhanini"
    },
    {
        "id": "artist1088",
        "name": "Mathias Kollros"
    },
    {
        "id": "artist1089",
        "name": "Matt Cavotta"
    },
    {
        "id": "artist1090",
        "name": "Matt Dixon"
    },
    {
        "id": "artist1091",
        "name": "Matteo Bassini"
    },
    {
        "id": "artist1092",
        "name": "Matteo Marjoram"
    },
    {
        "id": "artist1093",
        "name": "Matt Forsyth"
    },
    {
        "id": "artist1094",
        "name": "Matt Gaser"
    },
    {
        "id": "artist1095",
        "name": "Matthew D. Wilson"
    },
    {
        "id": "artist1096",
        "name": "Matthew G. Lewis"
    },
    {
        "id": "artist1097",
        "name": "Matthew Gregory"
    },
    {
        "id": "artist1098",
        "name": "Matthew Mitchell"
    },
    {
        "id": "artist1099",
        "name": "Matt Jukes"
    },
    {
        "id": "artist1100",
        "name": "Matt Smith"
    },
    {
        "id": "artist1101",
        "name": "Matt Stawicki"
    },
    {
        "id": "artist1102",
        "name": "Matt Stewart"
    },
    {
        "id": "artist1103",
        "name": "Matt Stikker"
    },
    {
        "id": "artist1104",
        "name": "Matt Tabak"
    },
    {
        "id": "artist1105",
        "name": "Matt Thompson"
    },
    {
        "id": "artist1106",
        "name": "Matt Warren"
    },
    {
        "id": "artist1107",
        "name": "Matt Zeilinger"
    },
    {
        "id": "artist1108",
        "name": "Mauricio Calle"
    },
    {
        "id": "artist1109",
        "name": "Maxilla"
    },
    {
        "id": "artist1110",
        "name": "Maxime Minard"
    },
    {
        "id": "artist1111",
        "name": "Maxim Kostin"
    },
    {
        "id": "artist1112",
        "name": "Max McCall"
    },
    {
        "id": "artist1113",
        "name": "Maxx Marshall"
    },
    {
        "id": "artist1114",
        "name": "McLean Kendree"
    },
    {
        "id": "artist1115",
        "name": "Meel Tamphanon"
    },
    {
        "id": "artist1116",
        "name": "Mélanie Bourgeois"
    },
    {
        "id": "artist1117",
        "name": "Melissa A. Benson"
    },
    {
        "id": "artist1118",
        "name": "Melissa DeTora"
    },
    {
        "id": "artist1119",
        "name": "Meris Mullaley"
    },
    {
        "id": "artist1120",
        "name": "Merlin G.G"
    },
    {
        "id": "artist1121",
        "name": "Meyoco"
    },
    {
        "id": "artist1122",
        "name": "Mia Boas"
    },
    {
        "id": "artist1123",
        "name": "Miao Aili"
    },
    {
        "id": "artist1124",
        "name": "Micah Epstein"
    },
    {
        "id": "artist1125",
        "name": "Michael Bruinsma"
    },
    {
        "id": "artist1126",
        "name": "Michael C. Hayes"
    },
    {
        "id": "artist1127",
        "name": "Michael Danza"
    },
    {
        "id": "artist1128",
        "name": "Michael Hutter"
    },
    {
        "id": "artist1129",
        "name": "Michael Koehler"
    },
    {
        "id": "artist1130",
        "name": "Michael Koelsch"
    },
    {
        "id": "artist1131",
        "name": "Michael Komarck"
    },
    {
        "id": "artist1132",
        "name": "Michael MacRae"
    },
    {
        "id": "artist1133",
        "name": "Michael Phillippi"
    },
    {
        "id": "artist1134",
        "name": "Michael Ryan"
    },
    {
        "id": "artist1135",
        "name": "Michael Sutfin"
    },
    {
        "id": "artist1136",
        "name": "Michael Walsh"
    },
    {
        "id": "artist1137",
        "name": "Michael Weaver"
    },
    {
        "id": "artist1138",
        "name": "Michael Whelan"
    },
    {
        "id": "artist1139",
        "name": "Micha Huigen"
    },
    {
        "id": "artist1140",
        "name": "Michal Ivan"
    },
    {
        "id": "artist1141",
        "name": "Michał Miłkowski"
    },
    {
        "id": "artist1142",
        "name": "Michele Giorgi"
    },
    {
        "id": "artist1143",
        "name": "Michele Parisi"
    },
    {
        "id": "artist1144",
        "name": "Michelle Esposito"
    },
    {
        "id": "artist1145",
        "name": "Mid"
    },
    {
        "id": "artist1146",
        "name": "MiDQN"
    },
    {
        "id": "artist1147",
        "name": "Miguel Mercado"
    },
    {
        "id": "artist1148",
        "name": "Miguel Sacristan"
    },
    {
        "id": "artist1149",
        "name": "Miho Midorikawa"
    },
    {
        "id": "artist1150",
        "name": "Mike Bierek"
    },
    {
        "id": "artist1151",
        "name": "Mike Burns"
    },
    {
        "id": "artist1152",
        "name": "Mike Demaine"
    },
    {
        "id": "artist1153",
        "name": "Mike Dringenberg"
    },
    {
        "id": "artist1154",
        "name": "Mike Franchina"
    },
    {
        "id": "artist1155",
        "name": "Mike Jordana"
    },
    {
        "id": "artist1156",
        "name": "Mike Kerr"
    },
    {
        "id": "artist1157",
        "name": "Mike Kimble"
    },
    {
        "id": "artist1158",
        "name": "Mike Ploog"
    },
    {
        "id": "artist1159",
        "name": "Mike Raabe"
    },
    {
        "id": "artist1160",
        "name": "Mike Sass"
    },
    {
        "id": "artist1161",
        "name": "Mike Uziel"
    },
    {
        "id": "artist1162",
        "name": "Mikio Masuda"
    },
    {
        "id": "artist1163",
        "name": "Miklós Ligeti"
    },
    {
        "id": "artist1164",
        "name": "Mila Pesic"
    },
    {
        "id": "artist1165",
        "name": "Miles Johnston"
    },
    {
        "id": "artist1166",
        "name": "Milivoj Ćeran"
    },
    {
        "id": "artist1167",
        "name": "Mina Jeon"
    },
    {
        "id": "artist1168",
        "name": "M I N A T O"
    },
    {
        "id": "artist1169",
        "name": "Mintautas Šukys"
    },
    {
        "id": "artist1170",
        "name": "Minttu Hynninen"
    },
    {
        "id": "artist1171",
        "name": "Min Yum"
    },
    {
        "id": "artist1172",
        "name": "Miranda Meeks"
    },
    {
        "id": "artist1173",
        "name": "Mirko Failoni"
    },
    {
        "id": "artist1174",
        "name": "Miro Petrov"
    },
    {
        "id": "artist1175",
        "name": "Misei Ito"
    },
    {
        "id": "artist1176",
        "name": "Mitch Cotie"
    },
    {
        "id": "artist1177",
        "name": "Mitchell Malloy"
    },
    {
        "id": "artist1178",
        "name": "Mitsuaki Sagiri"
    },
    {
        "id": "artist1179",
        "name": "Mitsuhiro Arita"
    },
    {
        "id": "artist1180",
        "name": "Miyaki Hajime"
    },
    {
        "id": "artist1181",
        "name": "Miyuki Aramaki"
    },
    {
        "id": "artist1182",
        "name": "M.Matsumoto"
    },
    {
        "id": "artist1183",
        "name": "Mohamed, age 4"
    },
    {
        "id": "artist1184",
        "name": "Mollie Harms"
    },
    {
        "id": "artist1185",
        "name": "Mónica Robles Corzo"
    },
    {
        "id": "artist1186",
        "name": "Monique Thirifay"
    },
    {
        "id": "artist1187",
        "name": "Monte Michael Moore"
    },
    {
        "id": "artist1188",
        "name": "Monztre"
    },
    {
        "id": "artist1189",
        "name": "Moopic"
    },
    {
        "id": "artist1190",
        "name": "Mr. Misang"
    },
    {
        "id": "artist1191",
        "name": "MSCHF"
    },
    {
        "id": "artist1192",
        "name": "Muhammad Firdaus"
    },
    {
        "id": "artist1193",
        "name": "Murakami Hisashi"
    },
    {
        "id": "artist1194",
        "name": "MURUGIAH"
    },
    {
        "id": "artist1195",
        "name": "M. W. Kaluta"
    },
    {
        "id": "artist1196",
        "name": "Nablange"
    },
    {
        "id": "artist1197",
        "name": "Nadezhda Tikhomirova"
    },
    {
        "id": "artist1198",
        "name": "Nadia Hurianova"
    },
    {
        "id": "artist1199",
        "name": "Nagano"
    },
    {
        "id": "artist1200",
        "name": "Nakamura8"
    },
    {
        "id": "artist1201",
        "name": "Nana Qi"
    },
    {
        "id": "artist1202",
        "name": "Naochika Morishita"
    },
    {
        "id": "artist1203",
        "name": "Naoki Saito"
    },
    {
        "id": "artist1204",
        "name": "Naomi Baker"
    },
    {
        "id": "artist1205",
        "name": "Nao Miyoshi"
    },
    {
        "id": "artist1206",
        "name": "Narendra Bintara Adi"
    },
    {
        "id": "artist1207",
        "name": "Natalie Andrewson"
    },
    {
        "id": "artist1208",
        "name": "Nataly Anderson"
    },
    {
        "id": "artist1209",
        "name": "Nathalie Hertz"
    },
    {
        "id": "artist1210",
        "name": "Nathan Ian Greene"
    },
    {
        "id": "artist1211",
        "name": "Nathaniel Himawan"
    },
    {
        "id": "artist1212",
        "name": "N.C. Winters"
    },
    {
        "id": "artist1213",
        "name": "Nelson Brown"
    },
    {
        "id": "artist1214",
        "name": "Nelson DeCastro"
    },
    {
        "id": "artist1215",
        "name": "NéNé Thomas"
    },
    {
        "id": "artist1216",
        "name": "Neo.G"
    },
    {
        "id": "artist1217",
        "name": "Nephelomancer"
    },
    {
        "id": "artist1218",
        "name": "Nereida"
    },
    {
        "id": "artist1219",
        "name": "Néstor Ossandón Leal"
    },
    {
        "id": "artist1220",
        "name": "NIARK1"
    },
    {
        "id": "artist1221",
        "name": "Nicholas Elias"
    },
    {
        "id": "artist1222",
        "name": "Nicholas Gregory"
    },
    {
        "id": "artist1223",
        "name": "Nick Bartoletti"
    },
    {
        "id": "artist1224",
        "name": "Nic Klein"
    },
    {
        "id": "artist1225",
        "name": "Nick Percival"
    },
    {
        "id": "artist1226",
        "name": "Nick Southam"
    },
    {
        "id": "artist1227",
        "name": "Nico Delort"
    },
    {
        "id": "artist1228",
        "name": "Nicola Leonard"
    },
    {
        "id": "artist1229",
        "name": "Nicole Gustafsson"
    },
    {
        "id": "artist1230",
        "name": "Nijimaarc"
    },
    {
        "id": "artist1231",
        "name": "Nikolai Maslakov"
    },
    {
        "id": "artist1232",
        "name": "Nikola Matkovic"
    },
    {
        "id": "artist1233",
        "name": "Nils Hamm"
    },
    {
        "id": "artist1234",
        "name": "Nino Is"
    },
    {
        "id": "artist1235",
        "name": "Nino Vecia"
    },
    {
        "id": "artist1236",
        "name": "Noah Bradley"
    },
    {
        "id": "artist1237",
        "name": "Noah Thatcher"
    },
    {
        "id": "artist1238",
        "name": "Noki"
    },
    {
        "id": "artist1239",
        "name": "Norikatsu Miyoshi"
    },
    {
        "id": "artist1240",
        "name": "Nottsuo"
    },
    {
        "id": "artist1241",
        "name": "Nuisuke"
    },
    {
        "id": "artist1242",
        "name": "O-G Osahune"
    },
    {
        "id": "artist1243",
        "name": "Oiya Zhang"
    },
    {
        "id": "artist1244",
        "name": "Oleg Bulakh"
    },
    {
        "id": "artist1245",
        "name": "Oleg Shekhovtsov"
    },
    {
        "id": "artist1246",
        "name": "Oleksandr Kozachenko"
    },
    {
        "id": "artist1247",
        "name": "Olena Richards"
    },
    {
        "id": "artist1248",
        "name": "Olga Tereshenko"
    },
    {
        "id": "artist1249",
        "name": "Oliver Barrett"
    },
    {
        "id": "artist1250",
        "name": "Oliver Wetter"
    },
    {
        "id": "artist1251",
        "name": "Olivier Bernard"
    },
    {
        "id": "artist1252",
        "name": "Omaha Pérez"
    },
    {
        "id": "artist1253",
        "name": "Omar Rayyan"
    },
    {
        "id": "artist1254",
        "name": "Oriana Menendez"
    },
    {
        "id": "artist1255",
        "name": "Ori Toor"
    },
    {
        "id": "artist1256",
        "name": "Ørjan Ruttenborg Svendsen"
    },
    {
        "id": "artist1257",
        "name": "Oscar Camacho"
    },
    {
        "id": "artist1258",
        "name": "Ovidio Cartagena"
    },
    {
        "id": "artist1259",
        "name": "Pablo Mendoza"
    },
    {
        "id": "artist1260",
        "name": "Pablo Rivera"
    },
    {
        "id": "artist1261",
        "name": "Pace Wilder"
    },
    {
        "id": "artist1262",
        "name": "Paolo Parente"
    },
    {
        "id": "artist1263",
        "name": "Paolo Puggioni"
    },
    {
        "id": "artist1264",
        "name": "Pascal Blanché"
    },
    {
        "id": "artist1265",
        "name": "Pascal Quidault"
    },
    {
        "id": "artist1266",
        "name": "Pat Lee"
    },
    {
        "id": "artist1267",
        "name": "Pat Lewis"
    },
    {
        "id": "artist1268",
        "name": "Patrick Faricy"
    },
    {
        "id": "artist1269",
        "name": "Patrick Ho"
    },
    {
        "id": "artist1270",
        "name": "Patrick Kochakji"
    },
    {
        "id": "artist1271",
        "name": "Patrick Kuhlman"
    },
    {
        "id": "artist1272",
        "name": "Patrik Hell"
    },
    {
        "id": "artist1273",
        "name": "Paul Bonner"
    },
    {
        "id": "artist1274",
        "name": "Paul Chadwick"
    },
    {
        "id": "artist1275",
        "name": "Pauline Voss"
    },
    {
        "id": "artist1276",
        "name": "Paulius Daščioras"
    },
    {
        "id": "artist1277",
        "name": "Paul Jackson"
    },
    {
        "id": "artist1278",
        "name": "Paul Lee"
    },
    {
        "id": "artist1279",
        "name": "Paul Mafayon"
    },
    {
        "id": "artist1280",
        "name": "Paul Scott Canavan"
    },
    {
        "id": "artist1281",
        "name": "Pavel Kolomeyets"
    },
    {
        "id": "artist1282",
        "name": "Peach Momoko"
    },
    {
        "id": "artist1283",
        "name": "Pedro Correa"
    },
    {
        "id": "artist1284",
        "name": "Pedro Maia"
    },
    {
        "id": "artist1285",
        "name": "Pedro Potier"
    },
    {
        "id": "artist1286",
        "name": "PE-nekoR"
    },
    {
        "id": "artist1287",
        "name": "Penguu"
    },
    {
        "id": "artist1288",
        "name": "Peo Michie"
    },
    {
        "id": "artist1289",
        "name": "Peter Bollinger"
    },
    {
        "id": "artist1290",
        "name": "Peter Diamond"
    },
    {
        "id": "artist1291",
        "name": "Peter Mohrbacher"
    },
    {
        "id": "artist1292",
        "name": "Peter Polach"
    },
    {
        "id": "artist1293",
        "name": "Pete Venters"
    },
    {
        "id": "artist1294",
        "name": "Pete White"
    },
    {
        "id": "artist1295",
        "name": "Phil Foglio"
    },
    {
        "id": "artist1296",
        "name": "Philip Helliwell"
    },
    {
        "id": "artist1297",
        "name": "Philip Straub"
    },
    {
        "id": "artist1298",
        "name": "Philip Tan"
    },
    {
        "id": "artist1299",
        "name": "Phillip Mosness"
    },
    {
        "id": "artist1300",
        "name": "Phill Simmer"
    },
    {
        "id": "artist1301",
        "name": "Phil Stone"
    },
    {
        "id": "artist1302",
        "name": "Phoebe Wahl"
    },
    {
        "id": "artist1303",
        "name": "Pierre Loyvet"
    },
    {
        "id": "artist1304",
        "name": "Pierre Raveneau"
    },
    {
        "id": "artist1305",
        "name": "Pig Hands"
    },
    {
        "id": "artist1306",
        "name": "PINDURSKI"
    },
    {
        "id": "artist1307",
        "name": "Piotr Dura"
    },
    {
        "id": "artist1308",
        "name": "Piotr Foksowicz"
    },
    {
        "id": "artist1309",
        "name": "Piotr Jabłoński"
    },
    {
        "id": "artist1310",
        "name": "Piyo"
    },
    {
        "id": "artist1311",
        "name": "Poison Project"
    },
    {
        "id": "artist1312",
        "name": "Pon Lee"
    },
    {
        "id": "artist1313",
        "name": "Post Malone"
    },
    {
        "id": "artist1314",
        "name": "Princess Hidir"
    },
    {
        "id": "artist1315",
        "name": "Psydrian"
    },
    {
        "id": "artist1316",
        "name": "Puddnhead"
    },
    {
        "id": "artist1317",
        "name": "Qianjiao Ma"
    },
    {
        "id": "artist1318",
        "name": "Qiao Dafu"
    },
    {
        "id": "artist1319",
        "name": "Qi Baocheng"
    },
    {
        "id": "artist1320",
        "name": "Qin Jun"
    },
    {
        "id": "artist1321",
        "name": "Qistina Khalidah"
    },
    {
        "id": "artist1322",
        "name": "Qiu De En"
    },
    {
        "id": "artist1323",
        "name": "Quan Xuejun"
    },
    {
        "id": "artist1324",
        "name": "Quintin Gleim"
    },
    {
        "id": "artist1325",
        "name": "Quinton Hoover"
    },
    {
        "id": "artist1326",
        "name": "Qu Xin"
    },
    {
        "id": "artist1327",
        "name": "Rachel Turian"
    },
    {
        "id": "artist1328",
        "name": "Rachta Lin"
    },
    {
        "id": "artist1329",
        "name": "Racrufi"
    },
    {
        "id": "artist1330",
        "name": "Rafael Albuquerque"
    },
    {
        "id": "artist1331",
        "name": "Rafal Wechterowicz"
    },
    {
        "id": "artist1332",
        "name": "Rafater"
    },
    {
        "id": "artist1333",
        "name": "Raf Kayupov"
    },
    {
        "id": "artist1334",
        "name": "Raf Sarmento"
    },
    {
        "id": "artist1335",
        "name": "Raita Kazama"
    },
    {
        "id": "artist1336",
        "name": "Ralph Horsley"
    },
    {
        "id": "artist1337",
        "name": "Raluca Marinescu"
    },
    {
        "id": "artist1338",
        "name": "Ramazan Kazaliev"
    },
    {
        "id": "artist1339",
        "name": "Randis Albion"
    },
    {
        "id": "artist1340",
        "name": "Randy Asplund-Faith"
    },
    {
        "id": "artist1341",
        "name": "Randy Elliott"
    },
    {
        "id": "artist1342",
        "name": "Randy Gallegos"
    },
    {
        "id": "artist1343",
        "name": "Randy Vargas"
    },
    {
        "id": "artist1344",
        "name": "Raoul Vitale"
    },
    {
        "id": "artist1345",
        "name": "Raph Lomotan"
    },
    {
        "id": "artist1346",
        "name": "Ravenna Tran"
    },
    {
        "id": "artist1347",
        "name": "Ray Lago"
    },
    {
        "id": "artist1348",
        "name": "Raymond Bonilla"
    },
    {
        "id": "artist1349",
        "name": "Raymond Swanland"
    },
    {
        "id": "artist1350",
        "name": "Rebecca Guay"
    },
    {
        "id": "artist1351",
        "name": "Rebecca On"
    },
    {
        "id": "artist1352",
        "name": "Rebekah Lynn"
    },
    {
        "id": "artist1353",
        "name": "Reiko Murakami"
    },
    {
        "id": "artist1354",
        "name": "Rémi Jacquot"
    },
    {
        "id": "artist1355",
        "name": "Rhonda Libbey"
    },
    {
        "id": "artist1356",
        "name": "Rian Gonzales"
    },
    {
        "id": "artist1357",
        "name": "Ricardo Bessa"
    },
    {
        "id": "artist1358",
        "name": "Ricardo Cavolo"
    },
    {
        "id": "artist1359",
        "name": "Ricardo Diseño"
    },
    {
        "id": "artist1360",
        "name": "Riccardo Federici"
    },
    {
        "id": "artist1361",
        "name": "Richard Kane Ferguson"
    },
    {
        "id": "artist1362",
        "name": "Richard Luong"
    },
    {
        "id": "artist1363",
        "name": "Richard Sardinha"
    },
    {
        "id": "artist1364",
        "name": "Richard Suwono"
    },
    {
        "id": "artist1365",
        "name": "Richard Thomas"
    },
    {
        "id": "artist1366",
        "name": "Richard Whitters"
    },
    {
        "id": "artist1367",
        "name": "Richard Wright"
    },
    {
        "id": "artist1368",
        "name": "Rick Emond"
    },
    {
        "id": "artist1369",
        "name": "Rick Farrell"
    },
    {
        "id": "artist1370",
        "name": "Rick O'Brien"
    },
    {
        "id": "artist1371",
        "name": "Rien."
    },
    {
        "id": "artist1372",
        "name": "Rimas Valeikis"
    },
    {
        "id": "artist1373",
        "name": "Rinco."
    },
    {
        "id": "artist1374",
        "name": "Rindo Karasuba"
    },
    {
        "id": "artist1375",
        "name": "Rio Krisma"
    },
    {
        "id": "artist1376",
        "name": "Riot Games"
    },
    {
        "id": "artist1377",
        "name": "rishxxv"
    },
    {
        "id": "artist1378",
        "name": "rk post"
    },
    {
        "id": "artist1379",
        "name": "Rob Alexander"
    },
    {
        "id": "artist1380",
        "name": "Robbie Trevino"
    },
    {
        "id": "artist1381",
        "name": "Roberta Ingranata"
    },
    {
        "id": "artist1382",
        "name": "Robert Bliss"
    },
    {
        "id": "artist1383",
        "name": "Robert Cornelius"
    },
    {
        "id": "artist1384",
        "name": "Robert J Schuster"
    },
    {
        "id": "artist1385",
        "name": "Roberto Gatto"
    },
    {
        "id": "artist1386",
        "name": "Robh Ruppel"
    },
    {
        "id": "artist1387",
        "name": "Robin Olausson"
    },
    {
        "id": "artist1388",
        "name": "Robot Chicken"
    },
    {
        "id": "artist1389",
        "name": "Rob Rey"
    },
    {
        "id": "artist1390",
        "name": "Rockey Chen"
    },
    {
        "id": "artist1391",
        "name": "Rogério Vilela"
    },
    {
        "id": "artist1392",
        "name": "Roger Raupp"
    },
    {
        "id": "artist1393",
        "name": "Romana Kendelic"
    },
    {
        "id": "artist1394",
        "name": "Roman Klonek"
    },
    {
        "id": "artist1395",
        "name": "Roman Kuteynikov"
    },
    {
        "id": "artist1396",
        "name": "Roman Tishenin"
    },
    {
        "id": "artist1397",
        "name": "Romas Kukalis"
    },
    {
        "id": "artist1398",
        "name": "Romiy"
    },
    {
        "id": "artist1399",
        "name": "Ron Brown"
    },
    {
        "id": "artist1400",
        "name": "Ron Chironna"
    },
    {
        "id": "artist1401",
        "name": "Ron Lemen"
    },
    {
        "id": "artist1402",
        "name": "Ron Spears"
    },
    {
        "id": "artist1403",
        "name": "Ron Spencer"
    },
    {
        "id": "artist1404",
        "name": "Ron Walotsky"
    },
    {
        "id": "artist1405",
        "name": "Rope Arrow"
    },
    {
        "id": "artist1406",
        "name": "Rorubei"
    },
    {
        "id": "artist1407",
        "name": "Rosemary Valero-O'Connell"
    },
    {
        "id": "artist1408",
        "name": "Rovina Cai"
    },
    {
        "id": "artist1409",
        "name": "Rowynn Ellis"
    },
    {
        "id": "artist1410",
        "name": "Rudy Siswanto"
    },
    {
        "id": "artist1411",
        "name": "Ruiko Nakamura"
    },
    {
        "id": "artist1412",
        "name": "Runa I. Rosenberger"
    },
    {
        "id": "artist1413",
        "name": "Russell Lu"
    },
    {
        "id": "artist1414",
        "name": "Russ Nicholson"
    },
    {
        "id": "artist1415",
        "name": "Ruth Thompson"
    },
    {
        "id": "artist1416",
        "name": "Ruxing Gao"
    },
    {
        "id": "artist1417",
        "name": "Ryan Alexander Lee"
    },
    {
        "id": "artist1418",
        "name": "Ryan Barger"
    },
    {
        "id": "artist1419",
        "name": "Ryan Pancoast"
    },
    {
        "id": "artist1420",
        "name": "Ryan Printz"
    },
    {
        "id": "artist1421",
        "name": "Ryan Quickfall"
    },
    {
        "id": "artist1422",
        "name": "Ryanroro"
    },
    {
        "id": "artist1423",
        "name": "Ryan Valle"
    },
    {
        "id": "artist1424",
        "name": "Ryan Yee"
    },
    {
        "id": "artist1425",
        "name": "Ryo Kamei"
    },
    {
        "id": "artist1426",
        "name": "Ryota-H"
    },
    {
        "id": "artist1427",
        "name": "Ryota Murayama"
    },
    {
        "id": "artist1428",
        "name": "Rytis Sabaliauskas"
    },
    {
        "id": "artist1429",
        "name": "Ryuichi Sakuma"
    },
    {
        "id": "artist1430",
        "name": "Ryutei"
    },
    {
        "id": "artist1431",
        "name": "RYUTETSU"
    },
    {
        "id": "artist1432",
        "name": "Sachin Teng"
    },
    {
        "id": "artist1433",
        "name": "Sadboi"
    },
    {
        "id": "artist1434",
        "name": "Sage Coffey"
    },
    {
        "id": "artist1435",
        "name": "Said, age 6"
    },
    {
        "id": "artist1436",
        "name": "Sakura Tomo"
    },
    {
        "id": "artist1437",
        "name": "Salvatorre Zee Yazzie"
    },
    {
        "id": "artist1438",
        "name": "Sal Villagran"
    },
    {
        "id": "artist1439",
        "name": "Sam Burley"
    },
    {
        "id": "artist1440",
        "name": "Sam Chivers"
    },
    {
        "id": "artist1441",
        "name": "Sam Denmark"
    },
    {
        "id": "artist1442",
        "name": "Sam Guay"
    },
    {
        "id": "artist1443",
        "name": "Sam Hogg"
    },
    {
        "id": "artist1444",
        "name": "Sami Makkonen"
    },
    {
        "id": "artist1445",
        "name": "Sam McKenzie"
    },
    {
        "id": "artist1446",
        "name": "Sam Rowan"
    },
    {
        "id": "artist1447",
        "name": "Sam Stoddard"
    },
    {
        "id": "artist1448",
        "name": "Samuel Araya"
    },
    {
        "id": "artist1449",
        "name": "Samuele Bandini"
    },
    {
        "id": "artist1450",
        "name": "Samuel Perin"
    },
    {
        "id": "artist1451",
        "name": "Sam White"
    },
    {
        "id": "artist1452",
        "name": "Sam Wolfe Connelly"
    },
    {
        "id": "artist1453",
        "name": "Sam Wood"
    },
    {
        "id": "artist1454",
        "name": "Samy Halim"
    },
    {
        "id": "artist1455",
        "name": "Sandra Everingham"
    },
    {
        "id": "artist1456",
        "name": "Sandy Lee"
    },
    {
        "id": "artist1457",
        "name": "Sansyu"
    },
    {
        "id": "artist1458",
        "name": "Sarah Finnigan"
    },
    {
        "id": "artist1459",
        "name": "Sarah Keortge"
    },
    {
        "id": "artist1460",
        "name": "Sara Leal"
    },
    {
        "id": "artist1461",
        "name": "Sara Pitre-Dorocher"
    },
    {
        "id": "artist1462",
        "name": "Sara Winters"
    },
    {
        "id": "artist1463",
        "name": "Satoru Senda"
    },
    {
        "id": "artist1464",
        "name": "SchmandrewART"
    },
    {
        "id": "artist1465",
        "name": "Scooter"
    },
    {
        "id": "artist1466",
        "name": "Scott Altmann"
    },
    {
        "id": "artist1467",
        "name": "Scott Bailey"
    },
    {
        "id": "artist1468",
        "name": "Scott Balmer"
    },
    {
        "id": "artist1469",
        "name": "Scott Buoncristiano"
    },
    {
        "id": "artist1470",
        "name": "Scott Chou"
    },
    {
        "id": "artist1471",
        "name": "Scott Hampton"
    },
    {
        "id": "artist1472",
        "name": "Scott Kirschner"
    },
    {
        "id": "artist1473",
        "name": "Scott M. Fischer"
    },
    {
        "id": "artist1474",
        "name": "Scott Murphy"
    },
    {
        "id": "artist1475",
        "name": "Scott Okumura"
    },
    {
        "id": "artist1476",
        "name": "Scott Van Essen"
    },
    {
        "id": "artist1477",
        "name": "Sean Mayovsky"
    },
    {
        "id": "artist1478",
        "name": "Sean McConnell"
    },
    {
        "id": "artist1479",
        "name": "Sean Murray"
    },
    {
        "id": "artist1480",
        "name": "Sean O'Neil"
    },
    {
        "id": "artist1481",
        "name": "Sean Sevestre"
    },
    {
        "id": "artist1482",
        "name": "Sean Vo"
    },
    {
        "id": "artist1483",
        "name": "Sebastian Giacobino"
    },
    {
        "id": "artist1484",
        "name": "Seb McKinnon"
    },
    {
        "id": "artist1485",
        "name": "See Machine"
    },
    {
        "id": "artist1486",
        "name": "SENNSU"
    },
    {
        "id": "artist1487",
        "name": "SENSEN"
    },
    {
        "id": "artist1488",
        "name": "Septian Fajrianto"
    },
    {
        "id": "artist1489",
        "name": "Serena Malyon"
    },
    {
        "id": "artist1490",
        "name": "Sergei Leoluch Panin"
    },
    {
        "id": "artist1491",
        "name": "Sergei Ryzhov"
    },
    {
        "id": "artist1492",
        "name": "Sergey Glushakov"
    },
    {
        "id": "artist1493",
        "name": "Sergio Cosmai"
    },
    {
        "id": "artist1494",
        "name": "Seseon Yoon"
    },
    {
        "id": "artist1495",
        "name": "Seth Conley"
    },
    {
        "id": "artist1496",
        "name": "Setor Fiadzigbey"
    },
    {
        "id": "artist1497",
        "name": "Seung Hoon Na"
    },
    {
        "id": "artist1498",
        "name": "Shafer Brown"
    },
    {
        "id": "artist1499",
        "name": "Shahab Alizadeh"
    },
    {
        "id": "artist1500",
        "name": "Shang Huitong"
    },
    {
        "id": "artist1501",
        "name": "Shawn Pagels"
    },
    {
        "id": "artist1502",
        "name": "Shawn Wood"
    },
    {
        "id": "artist1503",
        "name": "Shelly Wan"
    },
    {
        "id": "artist1504",
        "name": "Shie Nanahara"
    },
    {
        "id": "artist1505",
        "name": "Shikee"
    },
    {
        "id": "artist1506",
        "name": "Shinchuen Chen"
    },
    {
        "id": "artist1507",
        "name": "Shirai Hidemi"
    },
    {
        "id": "artist1508",
        "name": "Shiramine"
    },
    {
        "id": "artist1509",
        "name": "Shiro Yayoi"
    },
    {
        "id": "artist1510",
        "name": "Shishizaru"
    },
    {
        "id": "artist1511",
        "name": "Showichi Furumi"
    },
    {
        "id": "artist1512",
        "name": "Shreya Shetty"
    },
    {
        "id": "artist1513",
        "name": "Shuangcheng Leng"
    },
    {
        "id": "artist1514",
        "name": "Sidharth Chaturvedi"
    },
    {
        "id": "artist1515",
        "name": "Signalnoise"
    },
    {
        "id": "artist1516",
        "name": "Sija Hong"
    },
    {
        "id": "artist1517",
        "name": "Sila"
    },
    {
        "id": "artist1518",
        "name": "Simon Bisley"
    },
    {
        "id": "artist1519",
        "name": "Simon Dominic"
    },
    {
        "id": "artist1520",
        "name": "Skinner"
    },
    {
        "id": "artist1521",
        "name": "Skinnyelbows"
    },
    {
        "id": "artist1522",
        "name": "Slawomir Maniak"
    },
    {
        "id": "artist1523",
        "name": "SOFT_MEN"
    },
    {
        "id": "artist1524",
        "name": "Solomon Au Yeung"
    },
    {
        "id": "artist1525",
        "name": "Song Qijin"
    },
    {
        "id": "artist1526",
        "name": "Song Shikai"
    },
    {
        "id": "artist1527",
        "name": "Sophie Rochon"
    },
    {
        "id": "artist1528",
        "name": "Sophy Hollington"
    },
    {
        "id": "artist1529",
        "name": "So-Taro"
    },
    {
        "id": "artist1530",
        "name": "SS39"
    },
    {
        "id": "artist1531",
        "name": "Stacie Pitt"
    },
    {
        "id": "artist1532",
        "name": "Stanislav Sherbakov"
    },
    {
        "id": "artist1533",
        "name": "Stanton Feng"
    },
    {
        "id": "artist1534",
        "name": "Stella Spente"
    },
    {
        "id": "artist1535",
        "name": "Stepan Alekseev"
    },
    {
        "id": "artist1536",
        "name": "Stephanie Bouchard"
    },
    {
        "id": "artist1537",
        "name": "Stephanie Buscema"
    },
    {
        "id": "artist1538",
        "name": "Stephanie Law"
    },
    {
        "id": "artist1539",
        "name": "Stephanie Mitchell"
    },
    {
        "id": "artist1540",
        "name": "Stephan Martiniere"
    },
    {
        "id": "artist1541",
        "name": "Stephen Andrade"
    },
    {
        "id": "artist1542",
        "name": "Stephen Daniele"
    },
    {
        "id": "artist1543",
        "name": "Stephen L. Walsh"
    },
    {
        "id": "artist1544",
        "name": "Stephen Stark"
    },
    {
        "id": "artist1545",
        "name": "Stephen Tappin"
    },
    {
        "id": "artist1546",
        "name": "Steve Argyle"
    },
    {
        "id": "artist1547",
        "name": "Steve Ellis"
    },
    {
        "id": "artist1548",
        "name": "Steve Firchow"
    },
    {
        "id": "artist1549",
        "name": "Steve Luke"
    },
    {
        "id": "artist1550",
        "name": "Steve Morris"
    },
    {
        "id": "artist1551",
        "name": "Steven Belledin"
    },
    {
        "id": "artist1552",
        "name": "Steven Russell Black"
    },
    {
        "id": "artist1553",
        "name": "Steve Prescott"
    },
    {
        "id": "artist1554",
        "name": "Steve Sunu"
    },
    {
        "id": "artist1555",
        "name": "Steve White"
    },
    {
        "id": "artist1556",
        "name": "stoicHua"
    },
    {
        "id": "artist1557",
        "name": "Stuart Beel"
    },
    {
        "id": "artist1558",
        "name": "Stuart Griffin"
    },
    {
        "id": "artist1559",
        "name": "Sue Ellen Brown"
    },
    {
        "id": "artist1560",
        "name": "Sumie Okazu"
    },
    {
        "id": "artist1561",
        "name": "Sung Choi"
    },
    {
        "id": "artist1562",
        "name": "Sun Nan"
    },
    {
        "id": "artist1563",
        "name": "Susan Garfield"
    },
    {
        "id": "artist1564",
        "name": "Susan Van Camp"
    },
    {
        "id": "artist1565",
        "name": "Susumu Kuroi"
    },
    {
        "id": "artist1566",
        "name": "Suzanne Helmigh"
    },
    {
        "id": "artist1567",
        "name": "SUZHIHUI"
    },
    {
        "id": "artist1568",
        "name": "Svetlin Velinov"
    },
    {
        "id": "artist1569",
        "name": "Syd Mills"
    },
    {
        "id": "artist1570",
        "name": "Sydney Adams"
    },
    {
        "id": "artist1571",
        "name": "Sylvain Sarrailh"
    },
    {
        "id": "artist1572",
        "name": "Syutsuri"
    },
    {
        "id": "artist1573",
        "name": "Tada"
    },
    {
        "id": "artist1574",
        "name": "Takayuki Futami"
    },
    {
        "id": "artist1575",
        "name": "Takeuchi Moto"
    },
    {
        "id": "artist1576",
        "name": "Takuma Ebisu"
    },
    {
        "id": "artist1577",
        "name": "Talia Armato-Helle"
    },
    {
        "id": "artist1578",
        "name": "Tang Xiaogu"
    },
    {
        "id": "artist1579",
        "name": "Tan Yan Yao"
    },
    {
        "id": "artist1580",
        "name": "TAPIOCA"
    },
    {
        "id": "artist1581",
        "name": "Tara Rueping"
    },
    {
        "id": "artist1582",
        "name": "Taras Susak"
    },
    {
        "id": "artist1583",
        "name": "Taro Yamazaki"
    },
    {
        "id": "artist1584",
        "name": "Tatamepi"
    },
    {
        "id": "artist1585",
        "name": "Tatiana Kirgetova"
    },
    {
        "id": "artist1586",
        "name": "Tatiana Veryayskaya"
    },
    {
        "id": "artist1587",
        "name": "Tatiana Vetrova"
    },
    {
        "id": "artist1588",
        "name": "Taylor Ingvarsson"
    },
    {
        "id": "artist1589",
        "name": "TCC"
    },
    {
        "id": "artist1590",
        "name": "Ted Galaday"
    },
    {
        "id": "artist1591",
        "name": "Ted Naifeh"
    },
    {
        "id": "artist1592",
        "name": "Teodora Dumitriu"
    },
    {
        "id": "artist1593",
        "name": "Terada Katsuya"
    },
    {
        "id": "artist1594",
        "name": "Terese Nielsen"
    },
    {
        "id": "artist1595",
        "name": "Terry Springer"
    },
    {
        "id": "artist1596",
        "name": "Tetsu Kurosawa"
    },
    {
        "id": "artist1597",
        "name": "Tetsuo Hara"
    },
    {
        "id": "artist1598",
        "name": "Thanh Tuấn"
    },
    {
        "id": "artist1599",
        "name": "Thea Dumitriu"
    },
    {
        "id": "artist1600",
        "name": "Theodoru"
    },
    {
        "id": "artist1601",
        "name": "Thomas Denmark"
    },
    {
        "id": "artist1602",
        "name": "Thomas Gianni"
    },
    {
        "id": "artist1603",
        "name": "Thomas Manning"
    },
    {
        "id": "artist1604",
        "name": "Thomas M. Baxa"
    },
    {
        "id": "artist1605",
        "name": "Thomas Ricci"
    },
    {
        "id": "artist1606",
        "name": "Thomas Roach"
    },
    {
        "id": "artist1607",
        "name": "Thomas Stoop"
    },
    {
        "id": "artist1608",
        "name": "Thomas Zenteno"
    },
    {
        "id": "artist1609",
        "name": "Tiago Sousa"
    },
    {
        "id": "artist1610",
        "name": "Tia Masic"
    },
    {
        "id": "artist1611",
        "name": "Tianhua X"
    },
    {
        "id": "artist1612",
        "name": "Tiffany Turrill"
    },
    {
        "id": "artist1613",
        "name": "Timba Smits"
    },
    {
        "id": "artist1614",
        "name": "Tim Brumley"
    },
    {
        "id": "artist1615",
        "name": "Tim Hildebrandt"
    },
    {
        "id": "artist1616",
        "name": "Tim Jacobus"
    },
    {
        "id": "artist1617",
        "name": "Tingting Yeh"
    },
    {
        "id": "artist1618",
        "name": "Titus Lunter"
    },
    {
        "id": "artist1619",
        "name": "TMRWLND"
    },
    {
        "id": "artist1620",
        "name": "Tobias Kwan"
    },
    {
        "id": "artist1621",
        "name": "Tobihachi"
    },
    {
        "id": "artist1622",
        "name": "Todd Lockwood"
    },
    {
        "id": "artist1623",
        "name": "TODEE"
    },
    {
        "id": "artist1624",
        "name": "Toma Feizo Gas"
    },
    {
        "id": "artist1625",
        "name": "Tomas Duchek"
    },
    {
        "id": "artist1626",
        "name": "Tomas Giorello"
    },
    {
        "id": "artist1627",
        "name": "Tomáš Honz"
    },
    {
        "id": "artist1628",
        "name": "Tomasz Jedruszek"
    },
    {
        "id": "artist1629",
        "name": "Tomasz Zarucki"
    },
    {
        "id": "artist1630",
        "name": "Tom Babbey"
    },
    {
        "id": "artist1631",
        "name": "Tomek Larek"
    },
    {
        "id": "artist1632",
        "name": "Tom Fleming"
    },
    {
        "id": "artist1633",
        "name": "Tom Kyffin"
    },
    {
        "id": "artist1634",
        "name": "Tommy Arnold"
    },
    {
        "id": "artist1635",
        "name": "TOMO77"
    },
    {
        "id": "artist1636",
        "name": "Tomohito"
    },
    {
        "id": "artist1637",
        "name": "Tom Roberts"
    },
    {
        "id": "artist1638",
        "name": "Tom Wänerstrand"
    },
    {
        "id": "artist1639",
        "name": "Toni Infante"
    },
    {
        "id": "artist1640",
        "name": "Tony Foti"
    },
    {
        "id": "artist1641",
        "name": "Tony Roberts"
    },
    {
        "id": "artist1642",
        "name": "Tony Szczudlo"
    },
    {
        "id": "artist1643",
        "name": "Toraji"
    },
    {
        "id": "artist1644",
        "name": "Torgeir Fjereide"
    },
    {
        "id": "artist1645",
        "name": "Torstein Nordstrand"
    },
    {
        "id": "artist1646",
        "name": "Toru Terada"
    },
    {
        "id": "artist1647",
        "name": "Toshiaki Takayama"
    },
    {
        "id": "artist1648",
        "name": "Totetsu Kondo"
    },
    {
        "id": "artist1649",
        "name": "Tran Nguyen"
    },
    {
        "id": "artist1650",
        "name": "Trashkittyart"
    },
    {
        "id": "artist1651",
        "name": "Trevor Claxton"
    },
    {
        "id": "artist1652",
        "name": "Trevor Hairsine"
    },
    {
        "id": "artist1653",
        "name": "Trick Jarrett"
    },
    {
        "id": "artist1654",
        "name": "Tripper Dungan"
    },
    {
        "id": "artist1655",
        "name": "Tristan Elwell"
    },
    {
        "id": "artist1656",
        "name": "Tsubonari"
    },
    {
        "id": "artist1657",
        "name": "Tsutomu Kawade"
    },
    {
        "id": "artist1658",
        "name": "TSWCK"
    },
    {
        "id": "artist1659",
        "name": "T-Track"
    },
    {
        "id": "artist1660",
        "name": "Tuan Duong Chu"
    },
    {
        "id": "artist1661",
        "name": "Tubaki Halsame"
    },
    {
        "id": "artist1662",
        "name": "Tuomas Korpi"
    },
    {
        "id": "artist1663",
        "name": "Tyler Crook"
    },
    {
        "id": "artist1664",
        "name": "Tyler Jacobson"
    },
    {
        "id": "artist1665",
        "name": "Tyler Smith"
    },
    {
        "id": "artist1666",
        "name": "Tyler Walpole"
    },
    {
        "id": "artist1667",
        "name": "Tyler Wright"
    },
    {
        "id": "artist1668",
        "name": "Tyukina Tatiana"
    },
    {
        "id": "artist1669",
        "name": "UDON"
    },
    {
        "id": "artist1670",
        "name": "Uichi Ukumo"
    },
    {
        "id": "artist1671",
        "name": "Ulrich Brunin"
    },
    {
        "id": "artist1672",
        "name": "Umiu Geso"
    },
    {
        "id": "artist1673",
        "name": "Una Fricker"
    },
    {
        "id": "artist1674",
        "name": "Uriah Voth"
    },
    {
        "id": "artist1675",
        "name": "Uros Sljivic"
    },
    {
        "id": "artist1676",
        "name": "Uta Natsume"
    },
    {
        "id": "artist1677",
        "name": "Uzhen Lin"
    },
    {
        "id": "artist1678",
        "name": "Vaigintas Pakenis"
    },
    {
        "id": "artist1679",
        "name": "Valera Lutfullina"
    },
    {
        "id": "artist1680",
        "name": "Vallez Gax"
    },
    {
        "id": "artist1681",
        "name": "Val Mayerik"
    },
    {
        "id": "artist1682",
        "name": "Vance Kelly"
    },
    {
        "id": "artist1683",
        "name": "Vance Kovacs"
    },
    {
        "id": "artist1684",
        "name": "Veli Nyström"
    },
    {
        "id": "artist1685",
        "name": "Véronique Chabot"
    },
    {
        "id": "artist1686",
        "name": "Véronique Meignaud"
    },
    {
        "id": "artist1687",
        "name": "Victor Adame Minguez"
    },
    {
        "id": "artist1688",
        "name": "Victor Harmatiuk"
    },
    {
        "id": "artist1689",
        "name": "Victoria Caña"
    },
    {
        "id": "artist1690",
        "name": "Victor Maury"
    },
    {
        "id": "artist1691",
        "name": "Victor Sales"
    },
    {
        "id": "artist1692",
        "name": "Viko Menezes"
    },
    {
        "id": "artist1693",
        "name": "Viktor Titov"
    },
    {
        "id": "artist1694",
        "name": "Vilhelmas Banys"
    },
    {
        "id": "artist1695",
        "name": "Villarrte"
    },
    {
        "id": "artist1696",
        "name": "Vincent Christiaens"
    },
    {
        "id": "artist1697",
        "name": "Vincent Evans"
    },
    {
        "id": "artist1698",
        "name": "Vincent Proce"
    },
    {
        "id": "artist1699",
        "name": "Vi Szendrey (Cashile)"
    },
    {
        "id": "artist1700",
        "name": "Vladimir Krisetskiy"
    },
    {
        "id": "artist1701",
        "name": "Volkan Baǵa"
    },
    {
        "id": "artist1702",
        "name": "Volta Creation"
    },
    {
        "id": "artist1703",
        "name": "Voyager Illustration"
    },
    {
        "id": "artist1704",
        "name": "Walleystation"
    },
    {
        "id": "artist1705",
        "name": "Wang Chuxiong"
    },
    {
        "id": "artist1706",
        "name": "Wang Feng"
    },
    {
        "id": "artist1707",
        "name": "Wangjie Li"
    },
    {
        "id": "artist1708",
        "name": "Wang Yuqun"
    },
    {
        "id": "artist1709",
        "name": "Warren Mahy"
    },
    {
        "id": "artist1710",
        "name": "Wayne England"
    },
    {
        "id": "artist1711",
        "name": "Wayne Reynolds"
    },
    {
        "id": "artist1712",
        "name": "Wayne Wu"
    },
    {
        "id": "artist1713",
        "name": "Wei Guan"
    },
    {
        "id": "artist1714",
        "name": "Wei Wei"
    },
    {
        "id": "artist1715",
        "name": "Wenfei Ye"
    },
    {
        "id": "artist1716",
        "name": "Wero Gallo"
    },
    {
        "id": "artist1717",
        "name": "Wesley Burt"
    },
    {
        "id": "artist1718",
        "name": "WFlemming Illustration"
    },
    {
        "id": "artist1719",
        "name": "Whit Brachna"
    },
    {
        "id": "artist1720",
        "name": "Willem Hampson"
    },
    {
        "id": "artist1721",
        "name": "Will Gist"
    },
    {
        "id": "artist1722",
        "name": "William Donohoe"
    },
    {
        "id": "artist1723",
        "name": "William O'Connor"
    },
    {
        "id": "artist1724",
        "name": "William Phifer"
    },
    {
        "id": "artist1725",
        "name": "William Simpson"
    },
    {
        "id": "artist1726",
        "name": "William Tempest"
    },
    {
        "id": "artist1727",
        "name": "William Wu"
    },
    {
        "id": "artist1728",
        "name": "Willian Murai"
    },
    {
        "id": "artist1729",
        "name": "Will Liu"
    },
    {
        "id": "artist1730",
        "name": "Will Sweeney"
    },
    {
        "id": "artist1731",
        "name": "Winona Nelson"
    },
    {
        "id": "artist1732",
        "name": "Wisnu Tan"
    },
    {
        "id": "artist1733",
        "name": "Wizard of Barge"
    },
    {
        "id": "artist1734",
        "name": "Wojtek Łebski"
    },
    {
        "id": "artist1735",
        "name": "WolfSkullJack"
    },
    {
        "id": "artist1736",
        "name": "Wolk Sheep"
    },
    {
        "id": "artist1737",
        "name": "Wonchun Choi"
    },
    {
        "id": "artist1738",
        "name": "Wooden Cyclops"
    },
    {
        "id": "artist1739",
        "name": "Woonak"
    },
    {
        "id": "artist1740",
        "name": "Wylie Beckert"
    },
    {
        "id": "artist1741",
        "name": "Xabi Gaztelua"
    },
    {
        "id": "artist1742",
        "name": "Xavier Ribeiro"
    },
    {
        "id": "artist1743",
        "name": "Xiaji"
    },
    {
        "id": "artist1744",
        "name": "Xiaobotong"
    },
    {
        "id": "artist1745",
        "name": "XiaoDi Jin"
    },
    {
        "id": "artist1746",
        "name": "Xin-Yu Liu"
    },
    {
        "id": "artist1747",
        "name": "Xi Zhang"
    },
    {
        "id": "artist1748",
        "name": "Xu Tan"
    },
    {
        "id": "artist1749",
        "name": "Xu Xiaoming"
    },
    {
        "id": "artist1750",
        "name": "Yakotakos"
    },
    {
        "id": "artist1751",
        "name": "Yamada Rokkaku"
    },
    {
        "id": "artist1752",
        "name": "Yamamoto Akifumi"
    },
    {
        "id": "artist1753",
        "name": "Yang Guangmai"
    },
    {
        "id": "artist1754",
        "name": "Yang Hong"
    },
    {
        "id": "artist1755",
        "name": "Yang Jun Kwon"
    },
    {
        "id": "artist1756",
        "name": "Yang Luo"
    },
    {
        "id": "artist1757",
        "name": "Yangtian Li"
    },
    {
        "id": "artist1758",
        "name": "Yangyang"
    },
    {
        "id": "artist1759",
        "name": "Yan Li"
    },
    {
        "id": "artist1760",
        "name": "Yaomojun"
    },
    {
        "id": "artist1761",
        "name": "Yaya"
    },
    {
        "id": "artist1762",
        "name": "Yefim Kligerman"
    },
    {
        "id": "artist1763",
        "name": "Yeong-Hao Han"
    },
    {
        "id": "artist1764",
        "name": "Yigit Koroglu"
    },
    {
        "id": "artist1765",
        "name": "Yohann Schepacz"
    },
    {
        "id": "artist1766",
        "name": "Yoichi Ito"
    },
    {
        "id": "artist1767",
        "name": "Yoji Shinkawa"
    },
    {
        "id": "artist1768",
        "name": "Yokota Katsumi"
    },
    {
        "id": "artist1769",
        "name": "yo-ne"
    },
    {
        "id": "artist1770",
        "name": "Yongjae Choi"
    },
    {
        "id": "artist1771",
        "name": "Yoni Skolnik"
    },
    {
        "id": "artist1772",
        "name": "Yoroikoji"
    },
    {
        "id": "artist1773",
        "name": "Yoshimo"
    },
    {
        "id": "artist1774",
        "name": "Yoshino Himori"
    },
    {
        "id": "artist1775",
        "name": "Yoshiro Ambe"
    },
    {
        "id": "artist1776",
        "name": "Yoshitaka Amano"
    },
    {
        "id": "artist1777",
        "name": "Yoshiya"
    },
    {
        "id": "artist1778",
        "name": "Yoshi Yoshitani"
    },
    {
        "id": "artist1779",
        "name": "Yosuke Adachi"
    },
    {
        "id": "artist1780",
        "name": "Yosuke Ueno"
    },
    {
        "id": "artist1781",
        "name": "Yuchi Yuki"
    },
    {
        "id": "artist1782",
        "name": "Yuhki Takeuchi"
    },
    {
        "id": "artist1783",
        "name": "Yuichi Murakami"
    },
    {
        "id": "artist1784",
        "name": "Yuka Oka"
    },
    {
        "id": "artist1785",
        "name": "Yuka Sakuma"
    },
    {
        "id": "artist1786",
        "name": "Yukie Tajima"
    },
    {
        "id": "artist1787",
        "name": "Yuki Fujisawa"
    },
    {
        "id": "artist1788",
        "name": "Yukihiro Maruo"
    },
    {
        "id": "artist1789",
        "name": "Yu-ki Nishimoto"
    },
    {
        "id": "artist1790",
        "name": "Yuko Shimizu"
    },
    {
        "id": "artist1791",
        "name": "Yuliya Litvinova"
    },
    {
        "id": "artist1792",
        "name": "Yu Maeda"
    },
    {
        "id": "artist1793",
        "name": "Yumeko"
    },
    {
        "id": "artist1794",
        "name": "Yumi Ozuno"
    },
    {
        "id": "artist1795",
        "name": "Yunomachi"
    },
    {
        "id": "artist1796",
        "name": "Yuriy Chemezov"
    },
    {
        "id": "artist1797",
        "name": "Yusuke Katekari"
    },
    {
        "id": "artist1798",
        "name": "Yutaka Li"
    },
    {
        "id": "artist1799",
        "name": "Yuta Shimpo"
    },
    {
        "id": "artist1800",
        "name": "Yuumei"
    },
    {
        "id": "artist1801",
        "name": "Yuzushio"
    },
    {
        "id": "artist1802",
        "name": "YW Tang"
    },
    {
        "id": "artist1803",
        "name": "Zach Alexander"
    },
    {
        "id": "artist1804",
        "name": "Zach Francks"
    },
    {
        "id": "artist1805",
        "name": "Zack Stella"
    },
    {
        "id": "artist1806",
        "name": "Zak Plucinski"
    },
    {
        "id": "artist1807",
        "name": "Zara Alfonso"
    },
    {
        "id": "artist1808",
        "name": "Zara H"
    },
    {
        "id": "artist1809",
        "name": "Zbigniew M. Bielak"
    },
    {
        "id": "artist1810",
        "name": "Zeb Love"
    },
    {
        "id": "artist1811",
        "name": "Zezhou Chen"
    },
    {
        "id": "artist1812",
        "name": "Zhang Jiazhen"
    },
    {
        "id": "artist1813",
        "name": "Zhao Tan"
    },
    {
        "id": "artist1814",
        "name": "Zhillustrator"
    },
    {
        "id": "artist1815",
        "name": "Zina Saunders"
    },
    {
        "id": "artist1816",
        "name": "Zinna Du"
    },
    {
        "id": "artist1817",
        "name": "ZIUK"
    },
    {
        "id": "artist1818",
        "name": "zizero"
    },
    {
        "id": "artist1819",
        "name": "Zoltan Boros"
    },
    {
        "id": "artist1820",
        "name": "Zoran Cardula"
    },
    {
        "id": "artist1821",
        "name": "ZOUNOSE"
    },
    {
        "id": "artist1822",
        "name": "Zuzanna Wużyk"
    },
    {
        "id": "artist1823",
        "name": "コーヘー"
    },
    {
        "id": "artist1824",
        "name": "库雪明"
    },
    {
        "id": "artist1825",
        "name": "康羽"
    },
    {
        "id": "artist1826",
        "name": "张艺娜"
    },
    {
        "id": "artist1827",
        "name": "徐晓鸣"
    },
    {
        "id": "artist1828",
        "name": "李尤松"
    },
    {
        "id": "artist1829",
        "name": "李有良"
    },
    {
        "id": "artist1830",
        "name": "李铁"
    },
    {
        "id": "artist1831",
        "name": "杨光恒"
    },
    {
        "id": "artist1832",
        "name": "杨钊"
    },
    {
        "id": "artist1833",
        "name": "林玄泰"
    },
    {
        "id": "artist1834",
        "name": "王峰"
    }
];

const checkboxList = document.getElementById('checkboxList');
const checkedState = {};

function createCheckbox(option) {
    const container = document.createElement('div');
    container.className= 'checkbox-container';
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.id = option.id;
    checkbox.className = 'artist-checkbox';
    checkbox.checked = checkedState[option.id] || false;
    checkbox.addEventListener('change', () => {
        checkedState[option.id] = checkbox.checked;
    });
    const label = document.createElement('label');
    label.htmlFor = option.id;
    label.innerText = option.name;
    container.appendChild(checkbox);
    container.appendChild(label);
    return container;
}

function renderOptions(filter = '') {
    const fragment = document.createDocumentFragment();
    options.forEach(option => {
        if (option.name.toLowerCase().includes(filter)) {
            fragment.appendChild(createCheckbox(option));
        }
    });
    checkboxList.innerHTML = '';
    checkboxList.appendChild(fragment);
}

function debounce(func, wait) {
    let timeout;
    return function(...args) {
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(this, args), wait);
    };
}

const filterInput = document.getElementById('filterInput');
filterInput.addEventListener('input', debounce(function() {
    const filter = this.value.toLowerCase();
    renderOptions(filter);
    
    document.querySelectorAll('.artist-checkbox').forEach(checkbox => {
        checkbox.addEventListener('change', filterCards);
    });
}, 300));

// Initial render
renderOptions();

document.querySelectorAll('.artist-checkbox').forEach(checkbox => {
    checkbox.addEventListener('change', filterCards);
});