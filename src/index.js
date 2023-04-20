
const API_URL = 'https://05f2ef49-6377-4b0f-9557-2fd14f372b8d.mock.pstmn.io/1'

moveSimpleSquare(API_URL)


function moveSimpleSquare(url) {

    document.addEventListener('DOMContentLoaded', () => {

        let elem = document.createElement('div');
        createSquare()
        squareMoveHandler()



        function createSquare() {
            elem.setAttribute('id', 'square');
            document.body.appendChild(elem);
        }



        function squareMoveHandler() {

            const elem = document.getElementById('square');

            let isGreen = false;
            let isBlue = false;
            let isRed = false;

            requestHandler()

            function move() {
                const animation = elem.animate([
                    { transform: 'translate(0)' },
                    { transform: 'translate(100px, 0)' }
                ], 1000);

                animation.addEventListener('finish', () => {
                    elem.style.transform = 'translate(100px, 0)';
                });
            }


            function changeSquareColor() {
                switch (true) {
                    case isGreen === true:
                        elem.style.background = 'green';
                        break;
                    case isBlue === true:
                        elem.style.background = 'blue';
                        break;
                    case isRed === true:
                        elem.style.background = 'red';
                        break;
                    default:
                        break;
                }
            }

            function squareMoveHandler() {
                setTimeout(() => { move() }, 1000)
            }


            function getRequest() {
                fetch(url)
                    .then(response => {
                        if (response.status === 200) {
                            return response.json();
                        } else {
                            throw new Error('Network response was not ok.');
                        }
                    })
                    .then(result => {
                        result === 1 ? isGreen = true : isBlue = true;
                    })
                    .catch(error => {
                        isRed = true;
                        console.error('There was a problem with the fetch operation:', error);

                    })
                    .finally(
                        () => {
                            setTimeout(() => {
                                changeSquareColor()
                            }, 2000);
                        }
                    )
            }


            function requestHandler() {
                setTimeout(() => {
                    squareMoveHandler();
                    getRequest();
                }, 1000);
            }
        }

    });

}
