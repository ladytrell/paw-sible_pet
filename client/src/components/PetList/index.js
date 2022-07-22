import React, { useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { QUERY_PETS } from '../../utils/queries';
import { idbPromise } from '../../utils/helpers';
import spinner from '../../assets/spinner.gif';

function PetList() {
 
  const { loading, data } = useQuery(QUERY_PETS);

  useEffect(() => {
    if (data) {
      data.pets.forEach((pet) => {
        idbPromise('pets', 'put', pet);
      });
    } else if (!loading) {
      idbPromise('pets', 'get')
    }
  }, [data, loading]);

  console.log(data);
  const pets = data.pets;
  console.log(pets);

    return (
    <div className="my-2">
      <h2>Our Pets:</h2>
      {pets.length ? (
        <div className="flex-row">
          {pets().map((pet) => (
            <div>
                <p>{pet.name}</p>
                <p> {pet.breed}</p>
                <p>{pet.mage}</p>
            </div>
          ))}
        </div>
      ) : (
        <h3>You haven't added any pets yet!</h3>
      )}
      {loading ? <img src={spinner} alt="loading" /> : null}
    </div>
  );
}

export default PetList;