// https://gist.github.com/gabiito/b670c4044b49235936fae91ceca1042f
const button = document.getElementById('btn_quote');
const button_before = document.getElementById('btn_quote_before');
const URL = 'https://animechan.vercel.app/api/random';
const quoteB = document.querySelector('#quote');
let arrayCitas = [];
let idx = 0;

const showSpinner = () => {
    document.getElementById('spinner-wrapper').style.display = 'block';
};
  
const hideSpinner = () => {
    document.getElementById('spinner-wrapper').style.display = 'none';
};



const get_data = async () => {
    showSpinner();
    const data = await fetch(URL);
    if(data.ok) {
        hideSpinner();
        const json = await data.json();
        return json;
    }
    hideSpinner();
}
const show_quote = ({anime, character, quote}) => {
    quoteB.querySelector('.txt').innerHTML = quote;
    quoteB.querySelector('.author').innerHTML = character;
    quoteB.querySelector('.from').innerHTML = anime;
}

document.addEventListener('DOMContentLoaded', () => {
    button.addEventListener('click', async (event) => { 
        if(!arrayCitas.length) {
            idx = 0;
        } else {
            idx++;
        }
        const item = arrayCitas[idx];
        if(item) return show_quote(item);
        const data = await get_data();
        if(data) {
            arrayCitas[idx] = data;
            show_quote(data);
        }
    });

    button_before.addEventListener('click', async (event) => { 
        if(idx > 0) {
            idx--;
            const data = arrayCitas[idx];
            if(data) {
                show_quote(data);
            }
        }
    });
});