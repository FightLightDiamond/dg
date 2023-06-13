import React from "react";
import Board from "../Components/Chess/Board";
import {useDispatch, useSelector} from "react-redux";
import {useEffectOnce} from "../App/Hooks/useEffectOnce";
import {IPiece, KNIGHT, move} from "../App/Http/Store/Reducers/chess.slice";
import {RootState} from "../App/Http/Store";
import {DndProvider} from "react-dnd";
import {HTML5Backend} from "react-dnd-html5-backend";
import Knight from "../Components/Chess/Pieces/Knight";
import BoardSquare from "../Components/Chess/BoardSquare";

export default function Map() {
    const dispatch = useDispatch()
    const chess  = useSelector((state: RootState) => state.chess);
    console.log(chess)
    useEffectOnce(() => {
        // dispatch({type: move.type, payload: {x: 0, y: 0}})
    });

    function renderSquare(i: number, item: IPiece) {
        const x = i % 8
        const y = Math.floor(i / 8)

        function renderPiece(x: number, y: number) {
            if (item?.piece === KNIGHT) {
                return <Knight boardId={i} />
            }
        }

        return (
            <div key={i} style={{width: '12.5%', height: '12.5%'}}>
                <BoardSquare x={x} y={y}>
                    {renderPiece(x, y)}
                </BoardSquare>
            </div>
        )
    }

    const squares: any[] = []

    chess.board.forEach((item, i) => {
        squares.push(renderSquare(i, item))
    })

    return (
        <div className='container h-screen w-auto aspect-square'>
            <DndProvider backend={HTML5Backend}>
                <div
                    style={{
                        width: '100%',
                        height: '100%',
                        display: 'flex',
                        flexWrap: 'wrap'
                    }}
                >
                    {squares}
                </div>
            </DndProvider>
        </div>
    )
}

