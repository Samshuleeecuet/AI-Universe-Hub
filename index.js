

const loadData=()=>{
    fetch("https://openapi.programming-hero.com/api/ai/tools")
        .then((res)=> res.json())
        .then((data) => showData(data.data.tools.slice(0,6)))
};
loadData();

const showData=(data)=>{
    const container = document.getElementById('data-container');
    container.innerText =""; 
    const featureContainer =       
    document.getElementsByClassName('featurelist');
    data.forEach(element => {
        const div = document.createElement("div");
        div.innerHTML=`<div class="card w-96 bg-base-100 shadow-xl my-5">
        <figure><img class="h-60" src="${element.image}" alt="Shoes" />    </figure>
        <div class="card-body">
           <h2 class="card-title">
             Features
           </h2>
           <p class= "featurelist pb-4 border-b-4 ">
            
           </p>
           
           <div class="card-actions justify-between">
            <div>
                <h2 class="card-title pb-3">${element.name}</h2>
                <span><i class="fa-solid fa-calendar-days pr-2"></i>${element.published_in}</span>
            </div> 
             <div><label for="my-modal-5" class="btn border bg-orange-200 p-2 border-2 rounded-full border-amber-500" onclick="showDetails(${element.id})"><i class="fa-solid fa-arrow-right"></i></label></div>
           </div>
         </div>
       </div>`

       container.appendChild(div);
        if(featureContainer.length == parseInt(element.id)){
            let txt = "";
            element.features.forEach(value);
            function value(index,item){
                txt += (item+1) + ".  " + index + "<br>";
            }
            featureContainer[featureContainer.length-1].innerHTML=txt;

        };
        
    }); 
};

function showAll(){
    fetch("https://openapi.programming-hero.com/api/ai/tools")
        .then((res)=> res.json())
        .then((data) => showData(data.data.tools))

};


const showDetails = (unique_id) => {
    if(unique_id<10){
        unique_id = '0'+unique_id.toString(10);
    }else{
        unique_id = unique_id.toString(10);
    }
    URL = `https://openapi.programming-hero.com/api/ai/tool/${unique_id}`;
    fetch(URL)
    .then((res) => res.json())
    .then(data => displayDetails(data.data));
   
}

const displayDetails = (data) =>{
    let modalDescription = document.getElementById('modalDescription');
    modalDescription.innerText=`${data.description}`;
    let modalPricing = document.getElementById('pricing');
    modalPricing.innerHTML = "";
    if(data.pricing == null){
        let div1 = document.createElement("div");
        div1.classList.add("pricediv");
        div1.innerHTML="No Data Found";
        modalPricing.appendChild(div1);
    }else{
        data.pricing.forEach(price =>{
            let div1 = document.createElement("div");
            div1.classList.add("pricediv");
            if(price.price.length<2){
                price.price="Free of Cost/";
            }
             div1.innerHTML = `${price.price}  ${price.plan}`;
             modalPricing.appendChild(div1);
        })
    }

    let modalFeature = document.getElementById("modalfeature");
    let modalIntegretion = document.getElementById("modalintegretion");
    if(data.features == null){
        modalFeature.innerHTML="No Data Found";
    }else{
        modalFeature.innerHTML=`
        <li> ${data.features[1].feature_name?data.features[1].feature_name:"No Data found"}</li>
        <li>${data.features[1].feature_name?data.features[2].feature_name:"No Data found"}</li>
        <li>${data.features[1].feature_name?data.features[3].feature_name:"No Data found"}</li>
    `
    }
    if(data.integrations == null){
        modalIntegretion.innerHTML = "No Data Found";
    }
    else{
        modalIntegretion.innerHTML=`
        <li> ${data.integrations[0]?data.integrations[0]:"No Data found"}</li>
        <li> ${data.integrations[0]?data.integrations[1]:"No Data found"}</li>
        <li> ${data.integrations[0]?data.integrations[2]:"No Data found"}</li>
    `
    }

    let modelImage = document.getElementById('modelimage');
    let imageInput = document.getElementById('imageinput');
    let imageOutput = document.getElementById('imageoutput')
    if(data.input_output_examples == null){
        imageInput.innerText = `Can you give any example?`;
    }else{
        imageInput.innerText = `${data.input_output_examples[0].input}`;
    }

    if(data.input_output_examples == null){
        imageOutput.innerText = `No! Not Yet! Take a break!!!`;
    }else{
        imageOutput.innerText = `${data.input_output_examples[0].output}`;
    }

    modelImage.innerHTML=`
    <img src="${data.image_link[0]}" alt="${data.tool_name}" class="rounded-xl h3" />
    `
    

   
}





showData();
