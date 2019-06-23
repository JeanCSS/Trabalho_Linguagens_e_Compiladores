var expt;
var vet = [];
var gramatica = "";
var nivel = 0;
var arvore = "";
function main() {

	var exprecao = document.getElementById("entrada").value;
	printTable(criartabelaDeToken(agrupar(exprecao)));
	
	arvore+="<div><h2>E</h2>";
	aux = E(exprecao, nivel);
	
	arvore+="</div>";
	document.getElementById('gramatica').innerHTML = gramatica;
	document.getElementById('arvore').innerHTML = arvore;
	console.log(aux);
}
function E(exprecao, nivel){
	expt = verificarExprecao(exprecao);
	vet.push(expt);
	filho = {};
	if(expt.length > 1){
		gramatica +="E"+nivel+"-> I O E"+(nivel+1)+"<br/>";
		arvore+="<div class='ioe'><h2>I</h2>";	
			filho1 = I(vet[nivel][0], nivel);
		arvore+="</div>";
		arvore+="<div class='ioe'><h2>O</h2>";
			filho2 = O(vet[nivel][1], nivel);
		arvore+="</div>";
		arvore+="<div class='ioe'><h2>E</h2>";
			filho3 = E(vet[nivel][2], nivel+1);
		arvore+="</div>";
		
		aux = [];
		for(i = 0; i < nivel; i++){ //a medida que a fumcao vai sendo execultada vai criando 
			aux.push(vet[i]);		// mais posicoes no vetor assis quw o algoritimo volta para a 
		}                           // a funcao de origem essas posicoes a abaixo desse nivel devem ser deletadas                       
		vet = aux;
	}
	else{
		gramatica +="E"+nivel+"-> I<br/>";
		arvore+="<div><h3>I</h3>";	
		filho = I(expt[0], nivel);
		arvore+="</div>";
		aux = [];
		for(i = 0; i < nivel; i++){ //a medida que a fumcao vai sendo execultada vai criando 
			aux.push(vet[i]);		// mais posicoes no vetor assis quw o algoritimo volta para a 
		}                           // a funcao de origem essas posicoes a abaixo desse nivel devem ser deletadas                       
		vet = aux; 
		
	}	
	return {NOME: "E", FILHO: filho};
}
function I(exprecao, nivel){
	arvore+="<div><h3>N</h3>";
	gramatica += "I-> N<br/>";
		
	filho = N(exprecao, nivel);
	arvore+="</div>";
	return {NOME: "I", FILHO: filho};
		
}
function O(exprecao, nivel){
	arvore+="<div><h3>"+exprecao+"</h3>";
	gramatica +="O-> "+exprecao+" <br/>";
	arvore+="</div>";
	return {NOME: "O", FILHO: exprecao};
}
function N(exprecao, nivel){
	
	exprecao = exprecao.split(""); //quebra a sting em um vetor 
	if(exprecao[0] == "("){//se tiver () remove eles e chama 'E'de novo
		arvore+="<div><h3>(E)</h3>";
		delete exprecao[0];
		delete exprecao[exprecao.length-1];                 
		gramatica +="N-> (E"+(nivel+1)+")<br/>";
		E(exprecao.join(""), nivel+1);
		arvore+="</div>";
		return {NOME: "N", FILHO: filho};
	}
	else{
		arvore+="<div><h3>D</h3>";
		gramatica +="N-> D<br/>";
		filho = D(exprecao.join(""), nivel);	
		arvore+="</div>";
		return {NOME: "N", FILHO: filho};
	}
}
function D(exprecao, nivel){
	if(exprecao.length > 1){
		var decimal = exprecao.split(".");
		if(decimal.length > 1){
			arvore+="<div><h3>D.D</h3>";
			gramatica +="D-> D.D<br/>";
			D(decimal[0]);
			D(decimal[1]);
			arvore+="</div>";
		}
		else{
			arvore+="<div><h3>DD</h3>";
			gramatica +="D-> DD<br/>";
			for(i in exprecao){
				D(exprecao[i]);
			}
			arvore+="</div>";
		}
	}
	else{
		arvore+="<div><h3>"+exprecao+"</h3>";
		gramatica +="D-> "+exprecao+"<br/>";
		arvore+="</div>";
		return {NOME: "D", FILHO: exprecao};
	}
}
function verificarExprecao(exprecao){
	esprecaoAgrupada = criartabelaDeToken(agrupar(exprecao));
	vetor = [];
	aux = "";
	var i = 0;
	if(esprecaoAgrupada[0]["codigo"] != "identificador"){        ( 115 + 333 )
		var i = 1;
		aux += esprecaoAgrupada[0]["simbolo"];

		while(esprecaoAgrupada[i]["prioridade"] != 1){
			aux += esprecaoAgrupada[i]["simbolo"];	
			i++;
		}
		aux += esprecaoAgrupada[i]["simbolo"];
		i++;
	}
	
	else{
		 
		aux += esprecaoAgrupada[i]["simbolo"];	                ( 22)
		i++;
		
	}
	vetor.push(aux);
	aux = "";
	if(i < esprecaoAgrupada.length){
		vetor.push(esprecaoAgrupada[i]["simbolo"])
		i++;
	}
	while(i < esprecaoAgrupada.length ) {
		aux += esprecaoAgrupada[i]["simbolo"];	
		i++;
	}
	if(aux !=  ""){
		vetor.push(aux);
	}
	return vetor; 
}

function criartabelaDeToken(exprecao){
	
	//funcao percorre caracter por caracter da exprecao matematica; 
	var tabelaDeToken = [];
	
	for (var i in exprecao)  {
		tabelaDeToken.push(token = {
			simbolo: exprecao[i], 
			codigo: verificaCaracter(exprecao[i]),
			prioridade: verificaPrioridade(i, exprecao)
		});
	}
	
	return tabelaDeToken;
}

function agrupar(exprecao){
	aux = "";
	vetor = [];
	parentesteseAberto = false;
	//funcao percorre caracter por caracter da exprecao matematica; 

	for (var i in exprecao)  {
		if(verificaCaracter(exprecao[i]) == 'identificador' ){
			aux += exprecao[i]
		}
		else{
			if(aux !=""){vetor.push(aux)};
			vetor.push(exprecao[i]);
			aux = "";
		}
	}
	if(aux !=""){vetor.push(aux)};
	return vetor;
}

function verificaPrioridade(c, vetor){
	var delocamento = 1;
	for (var i = 0; i <= c; i++) {
		if(vetor[i-1] == '('){
			delocamento ++;
		}
		if(vetor[i] == ')'){
			delocamento--;
		}
	}
	return delocamento;
}

function verificaCaracter(a){
	switch(a){
		case "+":
			return "Sim_adicao";
		case "-":
			return "Sim_subtracao";
		case "*":
			return "Sim_multiplicacao";
		case "/":
			return "Sim_divizao";
		case "(":
			return "Sim_Ap";
		case ")":
			return "Sim_Fp";
		default:
			return "identificador";	
	}
}

function printTable(e){
	tabela = "<table><tr><th>Token</th><th>Codigo</th></tr>";
	for (var i in e)  {
		tabela +='<tr><td>'+e[i]["simbolo"]+'</td><td>'+e[i]["codigo"]+'</td></tr>';
	}
	tabela+= "</table>";
    document.getElementById('table').innerHTML = tabela;
}


/* EX: 														 ((11+33)+77)+22                                      
E0->				        I           O                E1  ((11+33)+77) /+/ 22
I->							N           |                |   ((11+33)+77)
N->						  (E1)del[1]	 |               |   (11+33)+77
E1->     				 I O E2	del v[2]  |              |   (11+33) /+/ 77
I-> 			 	  N      \	\          |             |   (11+33)
N-> 			   (E2)del[2] \  \		    |            |   11+33
E2-> 		     I O E3 del[3] |  |		     |           |   11 /+/ 33
I->				 N  |  |       |  |          |           |   11
N->			    D   |  |       |  |          |           |	 11
D-> 		  11    |  |        |  |         |           |	 11
O-> 			    +  |         |	|        |           |   +   
E3->				   I         |   |       |           |	 33
I->					   N	     |    |      |           |   33
N->					   D	     |    |      |           |   33
D-> 				  33	     |    |      |           |   33
O-> 						     +    |      |           |   33
E2->                                  I      |           |	 +
I->                                   N      |           |   77
N->                                   D      |           |   77
D->									  77     |           |   77
O->                                          +           |   +
E1->                                                     I   o  E
I->                                                      N   +   5
N->                                                      D
D->                                                      22
*/


/*
	(1+2)+3
	E[
		I[
			N[
				(E)[
					I[
						N[
							D[
								1
								RETURN {NOME: "D" FILHO: "1"}
							]
							RETURN {NOME: "N" FILHO: D}
						]
						RETURN {NOME: "I" FILHO: N}
					]

					o[
						+
						RETURN {NOME: "O" FILHO: +}
					] 
					E[
						I[
							N[
								D[
									2
									RETURN {NOME: "D" FILHO: 2}
								]
								RETURN {NOME: "N" FILHO: D}
							]
							RETURN {NOME: "I" FILHO: N}
						]
						RETURN {NOME: "E" FILHO: I}
					]
					RETURN {NOME: "(E)" FILHO: IOE}
				]
				RETURN {NOME: "N" FILHO: (E)}
			]
			RETURN {NOME: "I" FILHO: N}
		]
		O[
			+
			RETURN {NOME: "O" FILHO: +}
		]
		E[
			I[
				N[
					D[					
						3
						RETURN {NOME: "D" FILHO: 3}
					]
					RETURN {NOME: "N" FILHO: D}
				]
				RETURN {NOME: "I" FILHO: N}
			]
			RETURN {NOME: "E" FILHO: I}
		]
		RETURN {NOME: "E" FILHO: IOE}
	]




*/