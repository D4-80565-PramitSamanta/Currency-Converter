const getCurOptions = async ()=>{
    const response = await fetch('https://api.exchangerate.host/symbols');
    const json = await response.json();
    return json.symbols;
}
//  getCurOptions().then(console.log);  
const getCurRate = async (fromC,toC)=>{
    const rateURL = new URL('https://api.exchangerate.host/convert');
    rateURL.searchParams.append('from',fromC);
    rateURL.searchParams.append('to',toC);
    const response = await fetch(rateURL);
    const json = await response.json();
    return json.result;
}
//  getCurRate('USD','INR').then(console.log);
const addOptionEle = (selectEle,optionItem)=>{
    const optionEle = document.createElement('option');
    optionEle.value = optionItem.code;
    optionEle.textContent = optionItem.description;
    selectEle.appendChild(optionEle);
}

const populateSelect = (selectEle,options)=>{
    options.forEach(element => {
        addOptionEle(selectEle,element);
    });
}

const setupCur=async()=>{
    const fromEle = document.getElementById('from');
    const toEle = document.getElementById('to');

    const currOptions = await getCurOptions();
    
    const descs = Object.keys(currOptions).map(
        (currencyKey) => {
            return currOptions[currencyKey]
        }
    );
    
     populateSelect(fromEle,descs);
     populateSelect(toEle,descs);
    // const symbols = Object.keys(currOptions);

    // populateSelect(fromEle, symbols.map(symbol => ({ code: symbol, description: currOptions[symbol] })));
    // populateSelect(toEle, symbols.map(symbol => ({ code: symbol, description: currOptions[symbol] })));
}

const setupEventListener = ()=>
{
    const formEle = document.getElementById('conform');
    // formEle.addEventListener('submit',e=>{
    //     e.preventDefault();
    // })
    
    formEle.addEventListener('submit', async function(event) {
    event.preventDefault(); // Prevent the default form submission
    
    const from = document.getElementById('from');
    const to = document.getElementById('to');
    // console.log(to.value);
    try
    {
        const rate = await getCurRate(from.value,to.value);
    const amnt = document.getElementById('amount').value;
    const excAm = amnt*rate;
    // const n =  Number(amnt * rate).toFixed(2);
    console.log(excAm.toFixed(2));
        
    document.getElementById('Result').textContent = amnt + ' ' + from.value + ' = ' + excAm.toFixed(2) + ' ' + to.value
    document.getElementById('Result').style.visibility = 'visible';
    document.getElementById('Result').style.backgroundColor = 'white';

    }
    catch(error)
    {
        document.getElementById('Result').textContent = "An error occured !!!"
        document.getElementById('Result').style.visibility = 'visible';
        document.getElementById('Result').style.backgroundColor = 'red';
    }
    });

}
//setupEventListener();

// setupCur();
