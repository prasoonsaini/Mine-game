import './Square.css';
import hoverEffect from '../assets/Sound/hover.wav';
import DiamondEffect from '../assets/Sound/gold.wav';
import goldIcon from '../assets/gold.png';
import bombIcon from '../assets/bomb.png';
import { useEffect, useState } from 'react';

function Square({ mine, setGameOver, gameOver, setScore, clickable}) {

    let [image, setImage] = useState(null);

    useEffect(() => {
        if (gameOver) {
            if (mine) {
                setImage(bombIcon);
                setTimeout(function(){
                },4000)
            }
            else {
                setImage(goldIcon);
                setTimeout(function(){
                },4000)
            }
            setTimeout(() => {
                window.location.reload()
            }, 1000);
        }
    }, [gameOver, mine])


    function mouseEnterHandle() {
        if (!image) {
            const sound = new Audio(hoverEffect);
            sound.play();
        }
    }

    function clickHandler() {

        if(gameOver) 
        return;

        if (!mine) {
            setScore((prevValue) => {
                const final_val = prevValue * 1.2;
                return final_val;
            });
            setImage(goldIcon);
            const sound = new Audio(DiamondEffect);
            sound.play();
        } else {
            setGameOver(true);
        }
    }

    return <>
        {clickable ? <div
            className='square-item'
            onMouseEnter={mouseEnterHandle}
            onClick={clickHandler}
        >
            {image && <img height={90} width={90} src={image} />}
        </div> : <div
            className='square-item-no-clickable'
            onMouseEnter={mouseEnterHandle}
            onClick={clickHandler}
        >
            {image && <img height={90} width={90} src={image} />}
        </div>}
    </>
}

export default Square;