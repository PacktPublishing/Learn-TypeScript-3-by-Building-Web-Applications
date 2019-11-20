import React, {ReactNode} from 'react';

type Props = {
    children: ReactNode;
}

export const Header = ({children}: Props) => <div>{children}</div>;
