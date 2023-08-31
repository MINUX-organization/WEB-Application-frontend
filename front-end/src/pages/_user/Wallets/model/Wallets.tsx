import { FButton, FContainer, FModal } from "@shared/ui";
import { HTMLProps } from "react";
import { CreateWallet } from "@features/CreateWallet";
import { WalletList } from "@widgets/WalletList";
import { useQuery } from "react-query";
import { getWalletList } from "../api";
import { Spin } from "antd";
import { useBooleanUrl } from "@shared/lib/useBooleanUrl";
import styles from './Wallets.module.scss'

export const Wallets = (props: HTMLProps<HTMLDivElement>) => {
  const walletListQuery = useQuery(['load wallet list'], () => getWalletList({}));
  const isAddOpen = useBooleanUrl('add-wallet');

  return (
    <div {...props} className={(props.className ?? '') + ' ' + styles['wrapper']}>
      {walletListQuery.isFetching && <div className="flex justify-center"><Spin /></div>}
      {!walletListQuery.isFetching && walletListQuery.data !== undefined && <WalletList list={walletListQuery.data.list} onUpdate={walletListQuery.refetch} />}
      <FButton severity='good' className="self-end" onClick={isAddOpen.setTrue}>Add new</FButton>
      <FModal open={isAddOpen.value} onClose={isAddOpen.setFalse} title="Add Wallet">
        <FContainer className={styles['new-wallet-wrapper']} bodyProps={{ className: styles['new-wallet-body']}}>
          <CreateWallet onAdd={isAddOpen.setFalse} />
        </FContainer>
      </FModal>
    </div>
  )
}
