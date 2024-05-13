import { NavLink } from 'react-router-dom';
import sprite from '../../img/sprite.svg';

export default function StartWorkout() {
  return (
    <div>
      <p>Start your workout</p>
      <div>
        <div>
          <div>1</div>
          <p>
            Create a personal library:{' '}
            <span>add the books you intend to read to it.</span>
          </p>
        </div>
        <div>
          <div>2</div>
          <p>
            Create your first workout:{' '}
            <span>define a goal, choose a period, start training.</span>
          </p>
        </div>
      </div>
      <NavLink to="/library">
        <p>My library </p>
        <svg>
          <use href={`${sprite}#icon-arrow-right`} />
        </svg>
      </NavLink>
    </div>
  );
}
