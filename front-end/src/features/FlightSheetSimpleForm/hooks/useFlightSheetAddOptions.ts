import { useQuery } from 'react-query';
import { TCryptocurrency, TMiner, TPool, TWallet } from '@/shared/types';
import { getCreateFlightSheetOptions } from '../api';
import { useCallback } from 'react';

export const useFlightSheetAddOptions = () => {
  const flightSheetAddOptionsQuery = useQuery({
    queryKey: ['flight-sheet-add-options'],
    queryFn: () => getCreateFlightSheetOptions({})
  })

  const calculateOptions = useCallback(
    (arg: {
      cryptocurrency: TCryptocurrency | null;
      wallet: TWallet | null;
      pool: TPool | null;
      miner: TMiner | null;
    }): {
      minerOptions: TMiner[];
      cryptocurrencyOptions: TCryptocurrency[];
      walletOptions: TWallet[];
      poolOptions: TPool[];
    } => {
      const data = flightSheetAddOptionsQuery.data?.data ?? undefined;
      if (data !== undefined) {
        return {
          minerOptions: (() => {
            const getMinersByCryptocurrency = (
              cryptocurrency: TCryptocurrency | null
            ) => {
              if (cryptocurrency === null) return data.cryptocurrencies;
              const algs = data.algorithms.filter(
                (alg) => cryptocurrency.algorithmId === alg.id
              );
              const algMines = data.algorithmMiner.filter(
                (algMine) =>
                  algs.length === 0 ||
                  algs.find((alg) => alg.id === algMine.algorithmId) !==
                    undefined
              );
              return data.miners.filter(
                (miner) =>
                  algMines.find((algMine) => algMine.minerId === miner.id) !==
                  undefined
              );
            };

            //cryptocurrency
            const minersByCryptocurrency =
              arg.cryptocurrency === null
                ? data.miners
                : (() => {
                    return getMinersByCryptocurrency(arg.cryptocurrency);
                  })();

            //wallet
            const minersByWallet =
              arg.wallet === null
                ? data.miners
                : (() => {
                    const cryptocurrency =
                      data.cryptocurrencies.find(
                        (crypto) => crypto.id === arg.wallet!.cryptocurrencyId
                      ) ?? null;
                    return getMinersByCryptocurrency(cryptocurrency);
                  })();

            //pool
            const minersByPool =
              arg.pool === null
                ? data.miners
                : (() => {
                    const cryptocurrency =
                      data.cryptocurrencies.find(
                        (crypto) => crypto.id === arg.pool!.cryptocurrencyId
                      ) ?? null;
                    return getMinersByCryptocurrency(cryptocurrency);
                  })();

            return data.miners.filter(
              (miner) =>
                minersByCryptocurrency.includes(miner) &&
                minersByWallet.includes(miner) &&
                minersByPool.includes(miner)
            );
          })(),
          cryptocurrencyOptions: (() => {
            //miner
            const cryptocurrencyByMiner =
              arg.miner === null
                ? data.cryptocurrencies
                : (() => {
                    const algMines = data.algorithmMiner.filter(
                      (algMine) => arg.miner!.id === algMine.minerId
                    );
                    const algs = data.algorithms.filter(
                      (alg) =>
                        algMines.find(
                          (algMine) => algMine.algorithmId === alg.id
                        ) !== undefined
                    );
                    return data.cryptocurrencies.filter(
                      (cryptocurrency) =>
                        algs.find(
                          (alg) => alg.id === cryptocurrency.algorithmId
                        ) !== undefined
                    );
                  })();

            //wallet
            const cryptocurrencyByWallet =
              arg.wallet === null
                ? data.cryptocurrencies
                : (() => {
                    const out = data.cryptocurrencies.find(
                      (cryptocurrency) =>
                        cryptocurrency.id === arg.wallet!.cryptocurrencyId
                    );
                    return out !== undefined ? [out] : [];
                  })();

            //pool
            const cryptocurrencyByPool =
              arg.pool === null
                ? data.cryptocurrencies
                : (() => {
                    const out = data.cryptocurrencies.find(
                      (cryptocurrency) =>
                        cryptocurrency.id === arg.pool!.cryptocurrencyId
                    );
                    return out !== undefined ? [out] : [];
                  })();

            return data.cryptocurrencies.filter(
              (cryptocurrency) =>
                cryptocurrencyByMiner.includes(cryptocurrency) &&
                cryptocurrencyByWallet.includes(cryptocurrency) &&
                cryptocurrencyByPool.includes(cryptocurrency)
            );
          })(),
          walletOptions: (() => {
            //cryptocurrency
            const walletByCryptocurrency =
              arg.cryptocurrency === null
                ? data.wallets
                : (() => {
                    return data.wallets.filter(
                      (v) => v.cryptocurrencyId === arg.cryptocurrency!.id
                    );
                  })();

            //pool
            const walletByPool =
              arg.pool === null
                ? data.wallets
                : (() => {
                    const cryptocurrency = data.cryptocurrencies.find(
                      (v) => v.id === arg.pool!.cryptocurrencyId
                    );
                    return cryptocurrency !== undefined
                      ? data.wallets.filter(
                          (v) => v.cryptocurrencyId === cryptocurrency.id
                        )
                      : [];
                  })();

            //miner
            const walletByMiner =
              arg.miner === null
                ? data.wallets
                : (() => {
                    const algMines = data.algorithmMiner.filter(
                      (v) => v.minerId === arg.miner!.id
                    );
                    const algs = data.algorithms.filter(
                      (alg) =>
                        algMines.find(
                          (algMine) => algMine.algorithmId === alg.id
                        ) !== undefined
                    );
                    const cryptocurrencies = data.cryptocurrencies.filter(
                      (cryptocurrency) =>
                        algs.find(
                          (alg) => alg.id === cryptocurrency.algorithmId
                        ) !== undefined
                    );
                    return data.wallets.filter(
                      (wallet) =>
                        cryptocurrencies.find(
                          (cryptocurrency) =>
                            cryptocurrency.id === wallet.cryptocurrencyId
                        ) !== undefined
                    );
                  })();

            return data.wallets.filter(
              (wallet) =>
                walletByCryptocurrency.includes(wallet) &&
                walletByPool.includes(wallet) &&
                walletByMiner.includes(wallet)
            );
          })(),
          poolOptions: (() => {
            //crypto
            const poolByCryptocurrency =
              arg.cryptocurrency === null
                ? data.pools
                : (() => {
                    const out = data.pools.find(
                      (pool) => pool.cryptocurrencyId === arg.cryptocurrency!.id
                    );
                    return out !== undefined ? [out] : [];
                  })();

            //wallet
            const poolByWallet =
              arg.wallet === null
                ? data.pools
                : (() => {
                    const cryptocurrency = data.cryptocurrencies.find(
                      (cryptocurrency) =>
                        arg.wallet!.cryptocurrencyId === cryptocurrency.id
                    );
                    if (cryptocurrency === undefined) return [];
                    const out = data.pools.find(
                      (pool) => pool.cryptocurrencyId === cryptocurrency.id
                    );
                    return out !== undefined ? [out] : [];
                  })();

            //miner
            const poolByMiner =
              arg.miner === null
                ? data.pools
                : (() => {
                    const algMines = data.algorithmMiner.filter(
                      (algMine) => algMine.minerId === arg.miner!.id
                    );
                    const algs = data.algorithms.filter(
                      (alg) =>
                        algMines.find(
                          (algMine) => algMine.algorithmId === alg.id
                        ) !== undefined
                    );
                    const cryptocurrencies = data.cryptocurrencies.filter(
                      (cryptocurrency) =>
                        algs.find(
                          (alg) => alg.id === cryptocurrency.algorithmId
                        ) !== undefined
                    );
                    return data.pools.filter(
                      (pool) =>
                        cryptocurrencies.find(
                          (cryptocurrency) =>
                            pool.cryptocurrencyId === cryptocurrency.id
                        ) !== undefined
                    );
                  })();

            return data.pools.filter(
              (pool) =>
                poolByCryptocurrency.includes(pool) &&
                poolByWallet.includes(pool) &&
                poolByMiner.includes(pool)
            );
          })(),
        };
      }
      return {
        minerOptions: [],
        cryptocurrencyOptions: [],
        walletOptions: [],
        poolOptions: [],
      };
    },
    [flightSheetAddOptionsQuery.data]
  );

  return {
    query: flightSheetAddOptionsQuery,
    calculateOptions,
  };
};
