
 const tokenMofid = document.getElementById('token-mofid');
 const tokenBidar= document.getElementById('token-bidar');
 const bidarCheck = document.getElementById('bidar-check');
 const mofidCheck = document.getElementById('mofid-check');
 const search = document.getElementById('search');
 const matchList = document.getElementById('match-list');
 const sahm = document.getElementById('sahm');
 const buyCheck = document.getElementById('buy-check');
 const sellCheck = document.getElementById('sell-check');
 const quantity = document.getElementById('quantity');
 const price = document.getElementById('price');
 const element = document.getElementById("element-row");
 var IR = ""


 const searchStates = async searchText => {

    var myHeaders = new Headers();
        myHeaders.append("Authorization", tokenMofid.value);
        myHeaders.append("Access-Control-Allow-Origin", "*");
        myHeaders.append("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

        var requestOptions = {
        headers: myHeaders,
        redirect: 'follow',
        mode: 'cors'        
        };

    const res = await fetch("https://api2.mofidonline.com/Web/V1/Symbol/GetSymbol?"+ new URLSearchParams({
        term: searchText
    }), requestOptions)
        
       
    const states = await res.json();

    let matches = states.filter(state => {
        const regex = new RegExp(`^${searchText}`, 'gi');

        return state.label.match(regex)

    });

    if(searchText.length===0){
        matches = []
        matchList.innerHTML = '';
    }

        outputHtml(matches);

       

};

tokenMofid.value =  "" // "BasicAuthentication de125a2c-c716-42e7-b86b-e13e0fc62743";
//show results
const outputHtml = matches =>{
    if(matches.length>0){


     const html = matches.map(
         match => `
     <div class="card card-body mb-1"  id="element-row" style="text-align: right;border: none;" >
     <h5>${match.label} <span class="text-primary" > </span></h5>
     </div>
     `
     )
     .join('')
 
    
        matchList.innerHTML = html;

        document.getElementById("element-row").addEventListener("click", function() {
            myFunction(matches[0]);
          });
    
    }
};
 search.addEventListener('input', () =>searchStates(search.value));


  function myFunction(match) {
    console.log(match);
    sahm.innerText = "<< " + document.getElementById('element-row').innerText + " >>";
    search.value = '';
    matchList.innerHTML = '';
    IR = match.isin


    setCookie("tok",tokenBidar.value);
  }
  

  function setCookie(c_name, value) {
    return localStorage.setItem(c_name, value);
}


 var parseJson = function(){

   

    var selectToken = tokenMofid 
    if(bidarCheck.checked){
        selectToken = tokenBidar 

        var side = "SIDE_BUY" 
        if(sellCheck.checked){
            side = "SIDE_SELL"  
        }

            //bidar 
            var order = {
                "insMaxLcode":IR,
                "price":parseInt(price.value),
                "quantity":parseInt(quantity.value),
                "id":"",
                "version":1,
                "hon":"",
                "bankAccountId":-1,
                "abbreviation":"",
                "latinAbbreviation":"",
                "side":side,
                "quantityStr":"",
                "remainingQuantity":0,
                "priceStr":"",
                "tradedQuantity":0,
                "averageTradedPrice":0,
                "disclosedQuantity":0,
                "orderType":"ORDER_TYPE_LIMIT",
                "validityType":"VALIDITY_TYPE_DAY",
                "validityDate":"",
                "validityDateHidden":"hidden",
                "orderStatusId":0,
                "queueIndex":-1,
                "searchedWord":"",
                "coreType":"c",
                "marketType":"",
                "hasUnderCautionAgreement":false,
                "dividedOrder":false,
                "clientUUID":""
            }
    }else{

        var side = 65 
        if(sellCheck.checked){
            side = 86 
        }

            // mofid
            var order = {
                "isin":IR,
                "orderCount":parseInt(quantity.value),
                "orderPrice":parseInt(price.value),
                "IsSymbolCautionAgreement":false,
                "CautionAgreementSelected":false,
                "IsSymbolSepahAgreement":false,
                "SepahAgreementSelected":true,
                "FinancialProviderId":1,
                "minimumQuantity":0,
                "maxShow":0,
                "orderId":0,
                "orderSide":side,
                "orderValidity":74,
                "orderValiditydate":null,
                "shortSellIsEnabled":false,
                "shortSellIncentivePercent":0
            }

    }

    


 
 

    var timeleft = 1000;
    clearInterval(downloadTimer);
    var Timer = setInterval(function(){
        timeleft--;

        if(bidarCheck.checked){
            // order.quantity = order.quantity -1
            console.log(sendRequeststoBidar(JSON.stringify(order),selectToken))

        }else{
            // order.orderCount = order.orderCount -1;
            console.log(sendRequeststoMofid(JSON.stringify(order),selectToken))

        }

        if(timeleft <= 0){
            console.log("clear timer")
            clearInterval(Timer);
        }
        },100);
       


  
}


function sendRequeststoMofid(orderJson,selectToken){

    console.log("order ",orderJson);
    

    var selectToken = tokenMofid 
    if(bidarCheck.checked){
        selectToken = tokenBidar 
    }

    var myHeaders = new Headers();
        myHeaders.append("Authorization", selectToken.value);
        myHeaders.append("Content-Type", "application/json");

        var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: orderJson,
        redirect: 'follow'
        };

        fetch("https://api2.mofidonline.com/Web/V1/Order/Post", requestOptions)
        .then(response => response.text())
        .then(result => console.log(result))
        .then(json => console.log(json))
        .catch(error => console.log('error', error));


}


function sendRequeststoBidar(orderJson,selectToken){

    console.log("order ",orderJson);
    
    var myHeaders = new Headers();
    myHeaders.append("Accept", "application/json, text/plain, */*");
    myHeaders.append("Accept-Encoding", " gzip, deflate, br");
    myHeaders.append("Content-Type", "application/json");

    myHeaders.append("Cache-Control", "no-cache");
    myHeaders.append("Connection", "keep-alive");
    myHeaders.append("Pragma", "no-cache");
    myHeaders.append("User-Agent", "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/85.0.4183.83 Safari/537.36");
    myHeaders.append("Sec-Fetch-Dest", "empty");
    myHeaders.append("Host", "ebb.exirbroker.com");
    myHeaders.append("Origin", "https://ebb.exirbroker.com");
    myHeaders.append("Referer", "https://ebb.exirbroker.com/mainNew");
    myHeaders.append("Sec-Fetch-Site", "same-origin");


      
        myHeaders.append("Cookie", selectToken);

    


        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: orderJson,
            redirect: 'follow',
            credentials: 'include'
        };
          
          fetch("https://ebb.exirbroker.com/api/v1/order", requestOptions)
            .then(response => response.text())
            .then(result => console.log(result))
            .then(json => console.log(json))
            .catch(error => console.log('error', error));

           

}
