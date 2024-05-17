import { useDispatch, useSelector } from 'react-redux';
import { selectInfoCurrentBook } from '../../redux/books/booksSelectors';
import sprite from '../../img/sprite.svg';
import { readingDell } from '../../redux/books/booksOperations';
import Loader from 'components/Loader/Loader';
import {
  ActionButton,
  ActionSvg,
  DayContainer,
  DiaryContainer,
  DiaryDayContainer,
  DiaryEntryListItem,
  DiaryHeader,
  DiaryList,
  DiaryPages,
  EntryActions,
  EntryDetails,
  EntryDuration,
  EntryPercent,
  NestedDiv,
  PagesPerHour,
} from './ReadingDiary.styled';

export default function ReadingDiary({ dailyReadings }) {
  const dispatch = useDispatch();
  const InfoAboutBook = useSelector(selectInfoCurrentBook);

  const handleDellTrash = e => {
    const res = {
      bookId: InfoAboutBook._id,
      readingId: e,
    };
    dispatch(readingDell(res));
  };

  return (
    <DiaryContainer>
      <DiaryList>
        {Object.entries(dailyReadings)
          .sort(([dateA], [dateB]) => {
            // Converting date strings to a format that can be compared
            const [dayA, monthA, yearA] = dateA.split('.');
            const [dayB, monthB, yearB] = dateB.split('.');
            const dateObjA = new Date(`${yearA}-${monthA}-${dayA}`);
            const dateObjB = new Date(`${yearB}-${monthB}-${dayB}`);
            return dateObjB - dateObjA;
          })
          .map(([date, dailyReadingArray], index) => {
            if (date !== 'Invalid Date') {
              // Calculate the total number of pages read per day
              const totalReadForDay = dailyReadingArray.reduce(
                (total, dailyReading) => total + dailyReading.totalRead,
                0
              );
              return (
                <li key={date}>
                  <DiaryDayContainer>
                    <DayContainer first={index === 0 ? 'true' : 'false'}>
                      <NestedDiv first={index === 0 ? 'true' : 'false'} />
                    </DayContainer>
                    <DiaryHeader>{date}</DiaryHeader>
                    <DiaryPages>{totalReadForDay} pages</DiaryPages>
                  </DiaryDayContainer>
                  <ul>
                    {dailyReadingArray.map(dailyReading => (
                      <DiaryEntryListItem key={dailyReading.id}>
                        <EntryDetails>
                          <EntryPercent>{dailyReading.percent}%</EntryPercent>
                          <EntryDuration>
                            {dailyReading.readingDuration} minutes
                          </EntryDuration>
                        </EntryDetails>

                        <div>
                          <EntryActions>
                            <ActionSvg>
                              <use href={`${sprite}#icon-block`} />
                            </ActionSvg>
                            <ActionButton
                              onClick={() => handleDellTrash(dailyReading.id)}
                            >
                              <svg width={14} height={14}>
                                <use href={`${sprite}#icon-trash`} />
                              </svg>
                            </ActionButton>
                          </EntryActions>
                          <PagesPerHour>
                            {dailyReading.totalRead} pages per hour
                          </PagesPerHour>
                        </div>
                      </DiaryEntryListItem>
                    ))}
                  </ul>
                </li>
              );
            } else {
              return <Loader key="1" />;
            }
          })}
      </DiaryList>
    </DiaryContainer>
  );
}
