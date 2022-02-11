import { CellState } from '@/models/gameModels';
import React from 'react';
import styles from '@/styles/Cell.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { boardActions } from 'redux-conf/boardSlice';
import { AppRootState } from 'redux-conf/store';

interface Props {
  index: number;
  value: CellState;
}

const Cell: React.FC<Props> = ({ index, value }) => {
  const dispatch = useDispatch();

  const isGameOver = useSelector(
    (state: AppRootState) => state.board.isReadOnly
  );

  const getCellClasses = (status: CellState) => {
    switch (status) {
      case 'E':
        return `${styles.cell} ${isGameOver ? '' : styles.cellFree}`;
      case 'X':
        return `${styles.cell} ${styles['cellX']}`;
      case 'O':
        return `${styles.cell} ${styles['cellY']}`;
    }
  };

  const handleCellClicked = () => {
    dispatch(boardActions.placeToken({ index }));
  };

  return (
    <div
      className={getCellClasses(value)}
      onClick={!isGameOver && value === 'E' ? handleCellClicked : undefined}
    />
  );
};

export default Cell;
