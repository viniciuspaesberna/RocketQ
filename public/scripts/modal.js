export default function Modal(){
    const modalWapper = document.querySelector('.modal-wrapper')

    const cancelButton = document.querySelector('.modal .button.cancel')
    cancelButton.addEventListener('click', close)

    function open() {
        modalWapper.classList.add('active')
    }

    function close(){
        modalWapper.classList.remove('active')
    }

    return {
        open,
        close
    }
}