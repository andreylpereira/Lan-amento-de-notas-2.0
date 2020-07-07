let alunos = []
let table

document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('addNotasButton').addEventListener('click', addNota)
})

let addNota = (ev) => {
    ev.preventDefault()

    let b1 = document.getElementById("n1").value
    let b2 = document.getElementById("n2").value
    let b3 = document.getElementById("n3").value
    let b4 = document.getElementById("n4").value
    let nomedoaluno = document.getElementById("nome").value

    if (nomedoaluno == '') {
        window.alert("Nome do aluno não foi inserido!")
        return
    }

    if (b1 == '' || b2 == '' || b3 == '' || b4 == '') {
        window.alert("Verifique se todas as notas estao preenchidas!")
        return
    }

    let aluno = {
        nome: nomedoaluno,
        bimestre1: Number(b1),
        bimestre2: Number(b2),
        bimestre3: Number(b3),
        bimestre4: Number(b4),
    }

    if (!table) {
        table = document.querySelector("table");
    }


    aluno.media = (aluno.bimestre1 + aluno.bimestre2 + aluno.bimestre3 + aluno.bimestre4) / 4

    if (aluno.media >= 7) {
        aluno.resAprovacao = "Aprovado"
    } else {
        aluno.resAprovacao = "Reprovado"
    }

    if (aluno.bimestre1 < 0 || aluno.bimestre1 > 10) {
        window.alert("As notas precisam estar entre 0 e 10!")
        return
    }
    if (aluno.bimestre2 < 0 || aluno.bimestre2 > 10) {
        window.alert("As notas precisam estar entre 0 e 10!")
        return
    }
    if (aluno.bimestre3 < 0 || aluno.bimestre3 > 10) {
        window.alert("As notas precisam estar entre 0 e 10!")
        return
    }
    if (aluno.bimestre4 < 0 || aluno.bimestre4 > 10) {
        window.alert("As notas precisam estar entre 0 e 10!")
        return
    }

    
    alunos.push(aluno);

    clearTable(); 
    mostrarAlunos(); 
    document.getElementById("tabela").reset() 
}

function mostrarAlunos() {
    var table = document.getElementById("tabela2"); 

    let alunosMaiorMedia = [] 
    let maiorMedia = -1 

    for (i = 0; i < alunos.length; i++) {

        if (alunos[i].media >= 7) { 
            alunosMaiorMedia.push(alunos[i]) 
            maiorMedia = alunos[i].media 

            for (j = 0; j < alunosMaiorMedia.length; j++) {
                if (alunosMaiorMedia[j].media < maiorMedia) {
                    alunosMaiorMedia.splice(j, 1); 
                }
            }

        }
    }

    for (i = 0; i < alunos.length; i++) {
        var row = table.insertRow(0);
        var cell0 = row.insertCell(0);
        var cell1 = row.insertCell(1);
        var cell2 = row.insertCell(2);
        var cell3 = row.insertCell(3);
        var cell4 = row.insertCell(4);
        var cell5 = row.insertCell(5);
        var cell6 = row.insertCell(6);

        if (alunosMaiorMedia.includes(alunos[i])) {
            cell0.innerHTML = '<font color=\'#ff0000\'>' + alunos[i].nome + '</font>';
            cell5.innerHTML = '<font color=\'#ff0000\'>' + alunos[i].media + '</font>';
            cell6.innerHTML = '<font color=\'#ff0000\'>' + alunos[i].resAprovacao + '</font>';
        } else {
            cell0.innerHTML = alunos[i].nome;
            cell5.innerHTML = alunos[i].media;
            cell6.innerHTML = alunos[i].resAprovacao;
        }
        cell1.innerHTML = alunos[i].bimestre1;
        cell2.innerHTML = alunos[i].bimestre2;
        cell3.innerHTML = alunos[i].bimestre3;
        cell4.innerHTML = alunos[i].bimestre4;
    }

    generateTableHead(table)
}

function generateTableHead(table) {
    let thead = table.createTHead();
    let row = thead.insertRow();

    addColumn("Aluno(a) ", row);
    addColumn("1º Bimestre", row);
    addColumn("2º Bimestre", row);
    addColumn("3º Bimestre", row);
    addColumn("4º Bimestre", row);
    addColumn("Média", row)
    addColumn("Resultado", row)
}

function addColumn(name, row) {
    let th = document.createElement("th");
    let text = document.createTextNode(name);
    th.appendChild(text);
    row.appendChild(th);
}

function clearTable() {
    var tableRef = document.getElementById("tabela2");
    while (tableRef.rows.length > 0) {
        tableRef.deleteRow(0);
    }
}