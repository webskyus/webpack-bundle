export default function clock() {
    let i = 0;
    return  function counter() {
        return i++;
    }
}