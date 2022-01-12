import React from 'react';
import { withStyles } from '@material-ui/styles';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';


const StyledMenuItem = withStyles({
    root: {
        paddingTop: '12px',
        paddingBottom: '12px',
        '&:hover': {
            backgroundColor: 'var(--color-bg-200)',
        },
        '& .MuiListItemText-root': {
            color: 'var(--color-text)',
        },
        '& .MuiListItemIcon-root': {
            color: 'var(--color-text-100)',
        },
    }
})(MenuItem);

interface PopupMemuItem {
    icon: JSX.Element;
    title: string | JSX.Element;
    onClick?: () => void;
};

interface PopupMenuProps {
    menu: Array<PopupMemuItem | JSX.Element>;
    onClose: () => void;
};

const isPopupMemuItem = (arg: any): arg is PopupMemuItem => {
    return 'icon' in arg;
};

const PopupMenu: React.FC<PopupMenuProps> = React.memo(({ menu, onClose }) => {

    const handleListKeyDown = React.useCallback((event: React.KeyboardEvent) => {
        if (event.key === 'Tab') {
            event.preventDefault();
            onClose();
        };
    }, []);

    return (
        <MenuList onKeyDown={handleListKeyDown}>
            {menu.map((item, i) => {
                if (isPopupMemuItem(item)) {
                    return (
                        <StyledMenuItem 
                            key={i} 
                            onClick={() => item.onClick && item.onClick() || onClose}
                        >
                            <ListItemIcon>
                                {item.icon}
                            </ListItemIcon>
                            {typeof item.title === 'string' ? (
                                <ListItemText>
                                    {item.title}
                                </ListItemText>
                            ) : (
                                item.title
                            )}
                        </StyledMenuItem>
                    )
                } else {
                    return item
                }
            })}
        </MenuList>
    )
});

export default PopupMenu;