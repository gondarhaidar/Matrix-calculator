const inpRC = document.querySelectorAll('.inpRC')
const create = document.querySelectorAll('.create')
const mat1 = document.querySelector('.mat-1')
const mat2 = document.querySelector('.mat-2')
const konmat = document.querySelectorAll('.kon-mat')
const smdg = document.querySelector('.smdg')
const proses = document.querySelector('.proses')
const h4mat = document.querySelectorAll('.h4mat')
const hasil = document.querySelector('.hasil')
const cntr_mat = document.querySelector('.cntr-mat')
const conmat1 = document.querySelector('.conmat1')
const conmat2 = document.querySelector('.conmat2')
let alrt = document.querySelector('.alert')
inpRC.forEach(irc => {
  irc.addEventListener('input', ()=>{
    if(parseInt(irc.value)>3){
      peringatan('Maksimal ordo 3×3')
      irc.value = ''
    }else if(parseInt(irc.value)<0){
      peringatan('Tidak boleh minus')
      irc.value = ''
    }
  })
})
function peringatan(msg){
  let bodyAlert = document.querySelector('.body-alert')
  bodyAlert.innerHTML = msg
  alrt.classList.add('geser')
  setTimeout(function() {
    alrt.classList.remove('geser')
  }, 1800);
}
/*** Algoritma pembuatan Matriks A ***/
create[0].addEventListener("click", ()=>{
  let row = parseInt(inpRC[0].value)
  let col = parseInt(inpRC[1].value)
  mat1.innerHTML = ''
  if(row > 0 && col > 0){
    conmat1.classList.remove('hide')
  }else{
    conmat1.classList.add('hide')
  }
  for(let i=0;i<row;i++){
    if(i===0 && row>0 && col>0){
      h4mat[0].innerHTML = '<h4>Matriks A</h4>'
    }
    mat1.innerHTML += cetakMatriks(col)
  }
})


/**** Algoritma pembuatan matriks B *****/
create[1].addEventListener("click", ()=>{
  let row = parseInt(inpRC[2].value)
  let col = parseInt(inpRC[3].value)
  mat2.innerHTML = ''
  if(row > 0 && col > 0){
    conmat2.classList.remove('hide')
  }else{
    conmat2.classList.add('hide')
  }
  for(let i=0;i<row;i++){
    if(i==0 && col>0 && row>0){
      h4mat[1].innerHTML = '<h4>Matriks B</h4>'
    }
    mat2.innerHTML += cetakMatriks(col)
  }
})


/***** Fungsi pembuatan baris matriks *****/
function cetakMatriks(val) {
  let inputs = '';
  for (let i = 0; i < val; i++) {
    inputs += `<input type="number" class="input-mat">`;
  }
  return `
    <div class="baris">
      ${inputs}
    </div>
  `;
}


/** Operasi pertambahan ***/
const tambah = document.querySelector('.tambah')

tambah.addEventListener('click', function(){
  OperasiTambahKurang('penjumlahan')
})
/** end operasi pertambahan **/

/*** operasi pengurangan ****/
const kurang = document.querySelector('.kurang')
kurang.addEventListener('click', ()=>{
  OperasiTambahKurang('pengurangan')
})
/**** end operasi pengurangan ***/

function OperasiTambahKurang(opr, nama){
  const baris1 = document.querySelectorAll('.mat-1 .baris');
  const cells1 = document.querySelectorAll('.mat-1 .input-mat')
  const baris2 = document.querySelectorAll('.mat-2 .baris')
  const cells2 = document.querySelectorAll('.mat-2 .input-mat')
  const kolom1 = cells1.length/baris1.length
  const kolom2 = cells2.length/baris2.length
  const matrA = createArr(baris1.length, kolom1, cells1)
  const matrB = createArr(baris2.length, kolom2, cells2)
  if(baris1.length != baris2.length && kolom1 != kolom2){
    peringatan('ordo matriks A dan B harus sama untuk '+opr)
    return
  }
  if(baris1.length === baris2.length && kolom1 === kolom2){
    let AB = []
    let proses = ''
    for(let i=0;i<matrA.length;i++){
      let brs = []
      let prosrow = ''
        for(let j=0;j<matrA[i].length;j++){
          if(opr === 'penjumlahan'){
            prosrow += `
              <span class="spn-pros">${matrA[i][j]} + ${matrB[i][j]}</span>
            `
            brs.push(matrA[i][j]+matrB[i][j])
          }else if(opr === 'pengurangan'){
           prosrow += `
            <span class="spn-pros">${matrA[i][j]} - ${matrB[i][j]}</span>
            `
            brs.push(matrA[i][j]-matrB[i][j])
          }
        }
      proses += `
      <div>
        ${prosrow}
      </div>
      `
      AB.push(brs)
    }
    cetakHasil(AB, proses)
    }else if(cells.length<=0 || cells2.length<=0){
    return
    }else{
    peringatan("Ordo A & B harus sama untuk " + opr)
  }
}

function cetakHasil(cells, ress=''){
  let resMatriks = ''
  for(let i=0;i<cells.length;i++){
    let row = ''
    let pros = ''
    for(let j=0;j<cells[i].length;j++){
      row += `<span class="spn-pros tes">${cells[i][j]}</span>`
    }
    resMatriks += `
    <div class="wrapPros">
      ${row}
    </div>
    `
  }
    proses.classList.add('brd-rd')
    hasil.classList.add('brd-rd')
    proses.innerHTML = ress
    smdg.innerHTML = '='
    hasil.innerHTML = resMatriks
}

function createArr(baris, kolom, cells){
  let matr = []
  let q = 0;
  for(let j=0; j<baris; j++){
    let arr = []
    for(let i=0; i<kolom; i++){
      arr.push(parseInt(cells[q].value) || 0)
      q++
    }
   matr.push(arr)
  }
  return matr
}
// Algoritma perkalian
const kali = document.querySelector('.kali')
kali.addEventListener('click', function(){
  const baris1 = document.querySelectorAll('.mat-1 .baris');
  const cells1 = document.querySelectorAll('.mat-1 .input-mat')
  const baris2 = document.querySelectorAll('.mat-2 .baris')
  const cells2 = document.querySelectorAll('.mat-2 .input-mat')
  const kolom1 = cells1.length/baris1.length
  const kolom2 = cells2.length/baris2.length
  const matrA = createArr(baris1.length, kolom1, cells1)
  const matrB = createArr(baris2.length, kolom2, cells2)
  if(kolom1 === baris2.length){
    kaliMatriks(matrA, matrB, baris1.length, kolom2)
  }else if(cells1.length<=0 || cells2.length<=0){
    return
    }
  else{
    peringatan("jumlah Baris A harus sama dengan jumlah kolom B")
  }
})

function kaliMatriks(A, B, barisA, kolomB){
  let C = [];  // Matriks hasil
let div = ''
for (let i = 0; i < A.length; i++) {
  C[i] = [];  
  let row = ''
  for (let j = 0; j < B[0].length; j++) {
    C[i][j] = 0;  
    let reskal = ''
    for (let k = 0; k < A[0].length; k++) {
      C[i][j] += A[i][k] * B[k][j]; 
        reskal += `${A[i][k]} × ${B[k][j]} + `
    }
    row += `<span class="${barisA>2?"reskal-2":"reskal-1"} spn-pros">${deletePlus(reskal)}</span>`
  }
  div += `<div class="">${row}</div>`
}
cetakHasil(C, div)
console.log(barisA)
}

function deletePlus(text){
const lastPlusIndex = text.lastIndexOf('+');
if (lastPlusIndex !== -1) {
  text = text.substring(0, lastPlusIndex) + text.substring(lastPlusIndex + 1);
}
return text
}

// Algoritma operasi determinant
const det = document.querySelectorAll('.det')
det.forEach((det, i)=> {
  det.addEventListener('click', ()=>{
  const baris1 = document.querySelectorAll('.mat-1 .baris');
  const cells1 = document.querySelectorAll('.mat-1 .input-mat')
  const baris2 = document.querySelectorAll('.mat-2 .baris')
  const cells2 = document.querySelectorAll('.mat-2 .input-mat')
  const kolom1 = cells1.length/baris1.length
  const kolom2 = cells2.length/baris2.length
  const matrA = createArr(baris1.length, kolom1, cells1)
  const matrB = createArr(baris2.length, kolom2, cells2)

    let data = []
    if(i ==0){
      if(cells1.length <= 0){
      return
    }
      data = determinant(matrA, 'A')
    }else{
      if(cells2.length <= 0){
      return
      }
      data = determinant(matrB, 'B')
      //proses.innerHTML = 'Determinant B'
    }
    proses.classList.remove('brd-rd')
    hasil.classList.remove('brd-rd')
    smdg.innerHTML = '='
    hasil.innerHTML = data[0] + '= ' + data[1]
  })
})
function determinant(matriks, ordo){
  if(matriks.length === 2 && matriks[0].length===2){
    let data = `
    (${matriks[0][0]}×${matriks[1][1]}) 
    - 
    (${matriks[0][1]}×${matriks[1][0]})`
    let result = matriks[0][0] * matriks[1][1] - matriks[0][1] * matriks[1][0]
    hasil.classList.remove('tiga')
    proses.innerHTML = 'Determinant ' + ordo
    return [data, result]
  }else if(matriks.length === 3 && matriks[0].length === 3){
    let data = `
    (${matriks[0][0]}×${matriks[1][1]}×${matriks[2][2]}) 
    + 
    (${matriks[0][1]}×${matriks[1][2]}×${matriks[2][0]})
    + 
    (${matriks[0][2]}×${matriks[1][0]}×${matriks[2][1]}) 
    - 
    (${matriks[0][2]}×${matriks[1][1]}×${matriks[2][0]}) 
    - 
    (${matriks[0][0]}×${matriks[1][2]}×${matriks[2][1]}) 
    - 
    (${matriks[0][1]}×${matriks[1][0]}×${matriks[2][2]})
    `
    let result = 
    matriks[0][0]*matriks[1][1]*matriks[2][2]
    + 
    matriks[0][1]*matriks[1][2]*matriks[2][0]
    + 
    matriks[0][2]*matriks[1][0]*matriks[2][1]
    - 
    matriks[0][2]*matriks[1][1]*matriks[2][0] 
    - 
    matriks[0][0]*matriks[1][2] *matriks[2][1]
    - 
    matriks[0][1]*matriks[1][0]*matriks[2][2]
    proses.innerHTML = 'Determinant ' + ordo
    hasil.classList.add('tiga')
   return [data, result]
  }else{
    peringatan('Operasi determinant hanya untuk matriks persegi')
  }
}
function getTranspose(mt){let result = []
  for(let i=0;i<mt[0].length;i++){
    let row = []
    for(let j=0;j<mt.length;j++){
      row.push(mt[j][i])
    }
    result.push(row)
  }
  return result
  
}
const transpose = document.querySelectorAll('.transpose')
  
transpose.forEach((tr, i) => {
  tr.addEventListener("click", ()=>{
  const baris1 = document.querySelectorAll('.mat-1 .baris');
  const cells1 = document.querySelectorAll('.mat-1 .input-mat')
  const baris2 = document.querySelectorAll('.mat-2 .baris')
  const cells2 = document.querySelectorAll('.mat-2 .input-mat')
  const kolom1 = cells1.length/baris1.length
  const kolom2 = cells2.length/baris2.length
  const matrA = createArr(baris1.length, kolom1, cells1)
  const matrB = createArr(baris2.length, kolom2, cells2)
    if(i===0){
      cetakHasil(getTranspose(matrA))
    }else if(i===1){
      cetakHasil(getTranspose(matrB))
    }
  })
})

