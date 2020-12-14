// YOUR NAME HERE
// Kamal Ait Omar
// === constants ===
const MAX_QTY = 9;
const productIdKey = "product";
const orderIdKey = "order";
const inputIdKey = "qte";
const achatIdKey = "achat"
const retirerIdKey = "remove"
// === global variables  ===
// the total cost of selected products 
var total = 0;



// function called when page is loaded, it performs initializations 
var init = function () {
	createShop();
	
	// TODO : add other initializations to achieve if you think it is required
}
window.addEventListener("load", init);



// usefull functions

/*
* create and add all the div.produit elements to the div#boutique element
* according to the product objects that exist in 'catalog' variable
*/
var createShop = function () {
	var shop = document.getElementById("boutique");
	for(var i = 0; i < catalog.length; i++) {
		shop.appendChild(createProduct(catalog[i], i));
	}
}

/*
* create the div.produit elment corresponding to the given product
* The created element receives the id "index-product" where index is replaced by param's value
* @param product (product object) = the product for which the element is created
* @param index (int) = the index of the product in catalog, used to set the id of the created element
*/
var createProduct = function (product, index) {
	// build the div element for product
	var block = document.createElement("div");
	block.className = "produit";
	// set the id for this product
	block.id = index + "-" + productIdKey;
	// build the h4 part of 'block'
	block.appendChild(createBlock("h4", product.name));
	
	// /!\ should add the figure of the product... does not work yet... /!\ 
	block.appendChild(createFigureBlock(product));

	// build and add the div.description part of 'block' 
	block.appendChild(createBlock("div", product.description, "description"));
	// build and add the div.price part of 'block'
	block.appendChild(createBlock("div", product.price, "prix"));
	// build and add control div block to product element
	block.appendChild(createOrderControlBlock(index));
	return block;
}


/* return a new element of tag 'tag' with content 'content' and class 'cssClass'
 * @param tag (string) = the type of the created element (example : "p")
 * @param content (string) = the html wontent of the created element (example : "bla bla")
 * @param cssClass (string) (optional) = the value of the 'class' attribute for the created element
 */
var createBlock = function (tag, content, cssClass) {
	var element = document.createElement(tag);
	if (cssClass != undefined) {
		element.className =  cssClass;
	}
	element.innerHTML = content;
	return element;
}

/*
* builds the control element (div.controle) for a product
* @param index = the index of the considered product
*
* TODO : add the event handling, 
*   /!\  in this version button and input do nothing  /!\  
*/
var createOrderControlBlock = function (index) {
	var control = document.createElement("div");
	control.className = "controle";

	// create input quantity element
	var input = document.createElement("input");
	input.id = index + '-' + inputIdKey;
	input.type = "number";
	input.step = "1";
	input.value = "0";
	input.min = "0";
	input.max = MAX_QTY.toString();
	// add input to control as its child
	control.appendChild(input);
	
	// create order button
	var button = document.createElement("button");
	button.className = 'commander';
	button.id = index + "-" + orderIdKey;
	button.addEventListener('click', addToCarte);
	// add control to control as its child
	control.appendChild(button);
	
	// the built control div node is returned
	return control;
}


/*
* create and return the figure block for this product
* see the static version of the project to know what the <figure> should be
* @param product (product object) = the product for which the figure block is created
*
* TODO : write the correct code
*/
var createFigureBlock = function (product) {
	// this is absolutely not the correct answer !
	// TODO 
	return createBlock("figure", "<img src=" + product.image + ">");
}

var achats = document.getElementsByClassName('achats')

function addToCarte(){
	btn = event.target;
	for(var i = 0; i < catalog.length; i++){
		if(btn.id == i + "-" + orderIdKey){
			var qty = document.getElementById(i + '-' + inputIdKey)
			if(qty.value != 0 && qty.value <= MAX_QTY){
				if(achats[0].children.length == 0){
					achats[0].appendChild(createAchatBlock(catalog[i], i , qty.value))
				}
				else{
					var exist = false
					for(x=0; x<achats[0].children.length; x++){
						if(i == achats[0].children[x].id[0]){
							var achat = document.getElementById(i + "-" + achatIdKey)
							achat.children[2].innerHTML = Number(achat.children[2].innerHTML) + Number(qty.value)

							if(Number(achat.children[2].innerHTML)>9){
								achat.children[2].innerHTML = 9
							}
							exist = true
						}
					}
					if(exist==false){
						achats[0].appendChild(createAchatBlock(catalog[i], i , qty.value))

						var achat = document.getElementById(i + "-" + achatIdKey)
						total += (Number(achat.children[2].innerHTML)*Number(achat.children[3].innerHTML))
					}
				}
			}	
		}
	}
	total = 0 
	for(i=0; i<achats[0].children.length;i++){
		total += Number(achats[0].children[i].children[2].innerHTML) * Number(achats[0].children[i].children[3].innerHTML)
	}
	var montant =  document.getElementById('montant')
	montant.innerHTML = total
}


var createAchatBlock = function (product, index, quant) {
	// build the div element for achat
	var block = document.createElement("div");
	block.className = "achat";

	// set the id for this product
	block.id = index + "-" + achatIdKey;

	// build the figure part of 'block'
	block.appendChild(createFigureBlock(product));

	// build the h4 part of 'block'
	block.appendChild(createBlock("h4", product.name));

	// build and add the div.quantite part of 'block'
	block.appendChild(createBlock("div", quant, "quantite"))

	// build and add the div.price part of 'block'
	block.appendChild(createBlock("div", product.price, "prix"));

	var control = document.createElement("div");
	control.className = "controle";
	block.appendChild(control);

	// create retirer button
	var button = document.createElement("button");
	button.className = 'retirer';
	button.id = index + "-" + retirerIdKey;
	button.addEventListener('click', removeAchat)

	// add control to control as its child
	control.appendChild(button);

	return block;
}

function removeAchat(){

	var id = event.target.id
	if(id.length == 8){
		document.getElementById(id[0]+"-"+achatIdKey).remove()
	}
	else{
		document.getElementById(id[0]+id[1]+"-"+achatIdKey).remove()
	}
	

	total = 0 
	for(i=0; i<achats[0].children.length;i++){
		total += Number(achats[0].children[i].children[2].innerHTML) * Number(achats[0].children[i].children[3].innerHTML)
	}
	var montant =  document.getElementById('montant')
	montant.innerHTML = total
}

var searchBar = document.getElementById("filter");
searchBar.addEventListener("keyup", search)

function search(){
	var input, filter, products, productBlock, productName, i, textValue;
	input = document.getElementById("filter");
	filter = input.value.toUpperCase();
	products = document.getElementById("boutique");
	productBlock = products.getElementsByClassName("produit")
	for(i=0; i < productBlock.length; i++){
		productName = productBlock[i].getElementsByTagName('h4')[0];

		textValue = productName.textContent || productName.innerHTML;
		
		if (textValue.toUpperCase().indexOf(filter) > -1) {
            productBlock[i].style.display = "";
        } else {
            productBlock[i].style.display = "none";
        }

	}
}