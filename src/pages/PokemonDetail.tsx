import React, { useCallback, useState } from 'react';
import { useQuery } from 'urql';

import OpenedPokeball from 'assets/opened-pokeball-min.png';
import { ReactComponent as Pokeball } from 'assets/pokeball.svg';
import Box from 'components/Box';
import Button from 'components/Button';
import Card from 'components/Card';
import Image from 'components/Image';
import Modal from 'components/Modal';
import Text from 'components/Text';
import {
  BasePokemonDetailData,
  GET_POKEMON_DETAIL,
  PokemonDetailData,
} from 'graphql/query';
import { catchPokemon, generateId, isNicknameValid } from 'helpers/game';
import { capitalizeFirstLetter } from 'helpers/text';
import { useMyPokemon, useRouter, useToggle, useTranslation } from 'hooks';

const PokemonDetailPage: React.FC = () => {
  const { history, params } = useRouter();
  const { t } = useTranslation();
  const [result] = useQuery<PokemonDetailData, BasePokemonDetailData>({
    query: GET_POKEMON_DETAIL,
    variables: { name: params.name ?? '' },
  });

  const [nickname, setNickname] = useState('');
  const [formError, setFormError] = useState<string | undefined>();
  const [isCatchSuccess, setCatchSuccess] = useState<boolean | undefined>();
  const [isModalOpened, toggleModal] = useToggle(false);
  const [myPokemon, addNewPokemon] = useMyPokemon();

  const isLoading = result.fetching;
  const isError = result.error;
  const pokemon = result.data?.pokemon;
  const types = pokemon?.types;
  const abilites = pokemon?.abilities;
  const moves = pokemon?.moves;

  const handleCatchPokemon = useCallback(() => {
    setFormError(undefined);
    setCatchSuccess(catchPokemon());
    toggleModal();
  }, [setCatchSuccess, toggleModal]);

  const handleSaveCatchedPokemon = useCallback(() => {
    setFormError(undefined);

    if (isNicknameValid(myPokemon, nickname)) {
      addNewPokemon({
        id: generateId(),
        image: pokemon?.sprites.front_default ?? '',
        name: pokemon?.name ?? '',
        nickname,
      });

      history.push('/mypokemon');
    } else {
      setFormError(t('error.nicknameInvalid'));
    }
  }, [addNewPokemon, history, myPokemon, pokemon, nickname]);

  if (isLoading) {
    return (
      <Text mt={5} textAlign="center">
        {t('common.state.loading')}
      </Text>
    );
  } else if (isError) {
    return (
      <Text mt={5} textAlign="center">
        {t('common.state.error')}
      </Text>
    );
  }

  return (
    <>
      <Box alignItems="center" p={2}>
        <Box width={[1, 1, 1 / 2, 3 / 4]}>
          <Box alignItems="center">
            <Image
              alt="sprite"
              height={200}
              src={pokemon?.sprites.front_default}
              width={200}
            ></Image>
            <Text fontWeight="medium">
              {capitalizeFirstLetter(pokemon?.name ?? '')}
            </Text>
          </Box>

          <Button alignSelf="center" onClick={handleCatchPokemon} width="50%">
            {t('common.actions.catch')}
          </Button>

          {!!types && (
            <Card disableHoverAnimation my={2} px={3}>
              <Text fontWeight="bold">{t('common.terms.type')}</Text>
              <Box flexDirection="row" flexWrap="wrap">
                {types.map((typeDetail, idx) => (
                  <Text key={idx} mr={2} width={[1 / 2, 1 / 3, 1 / 4, 1 / 5]}>
                    {capitalizeFirstLetter(typeDetail.type.name)}
                  </Text>
                ))}
              </Box>
            </Card>
          )}

          {!!abilites && (
            <Card disableHoverAnimation my={2} px={3}>
              <Text fontWeight="bold">{t('common.terms.ability')}</Text>
              <Box flexDirection="row" flexWrap="wrap">
                {abilites.map((abilityDetail, idx) => (
                  <Text key={idx} mr={2} width={[1 / 2, 1 / 3, 1 / 4, 1 / 5]}>
                    {capitalizeFirstLetter(abilityDetail.ability.name)}
                  </Text>
                ))}
              </Box>
            </Card>
          )}

          {!!moves && (
            <Card disableHoverAnimation my={2} px={3}>
              <Text fontWeight="bold">{t('common.terms.move')}</Text>
              <Box flexDirection="row" flexWrap="wrap">
                {moves.map((moveDetail, idx) => (
                  <Text key={idx} width={[1 / 2, 1 / 3, 1 / 4, 1 / 5]}>
                    {capitalizeFirstLetter(moveDetail.move.name)}
                  </Text>
                ))}
              </Box>
            </Card>
          )}
        </Box>
      </Box>

      <Modal handleClose={toggleModal} isOpen={isModalOpened}>
        <Box alignItems="center">
          {isCatchSuccess ? (
            <>
              <Pokeball height={100} width={100} />
              <Text textAlign="center">
                {t('common.state.catchSuccess', { name: pokemon?.name })}
              </Text>
              <Box p={1}>
                <input onChange={(event) => setNickname(event.target.value)} />
                <Button my={2} onClick={handleSaveCatchedPokemon}>
                  {t('common.actions.save')}
                </Button>
              </Box>
              <Text color="red">{formError}</Text>
            </>
          ) : (
            <>
              <Image height={100} mt={5} src={OpenedPokeball} width={100} />
              <Text mt={3}>
                {t('common.state.catchFailure', { name: pokemon?.name })}
              </Text>
            </>
          )}
        </Box>
      </Modal>
    </>
  );
};

export default PokemonDetailPage;
