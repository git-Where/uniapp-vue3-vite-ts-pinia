
const a = [1,2,3,4,5]
const c = a.map((item)=>{
  return item+2
})
console.log(a,c)


const numbers = [10, 5, 8, 3, 12];
const maxNumber = numbers.reduce((max, curr) => {
  return Math.max(max, curr)
}, Number.MIN_SAFE_INTEGER);
console.log(Number.MAX_SAFE_INTEGER); // 12
Number.MIN_SAFE_INTEGER
const minNumber = numbers.reduce((min, curr) => Math.min(min, curr), Number.MAX_SAFE_INTEGER);
console.log(minNumber); // 3

for(let i = 0;i<10;i++){
  if(i>4){
    break;
  }
  console.log(i)
}
