import {
    AppBar,
    Backdrop,
    Badge,
    Box,
    IconButton,
    Toolbar,
    Tooltip,
    Typography,
} from "@mui/material";
import React, { Suspense, lazy, useState } from "react";
import { orange } from "../../constants/color";
import {
    Add as AddIcon,
    Menu as MenuIcon,
    Search as SearchIcon,
    Group as GroupIcon,
    Logout as LogoutIcon,
    Notifications as NotificationsIcon,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
// import { server } from "../../constants/config";
import toast from "react-hot-toast";

const SearchDialog = lazy(() => import("../specific/Search"));
const NotificationDialog = lazy(() => import("../specific/Notifications"));
const NewGroupDialog = lazy(() => import("../specific/NewGroup"));

const Header = () => {

    const navigate = useNavigate();

    const [isMobile, setisMobile] = useState(false)
    const [isSearch, setisSearch] = useState(false)
    const [isNewGroup, setisNewGroup] = useState(false)
    const [isNotification, setisNotification] = useState(false)
    const handleMobile = () => setisMobile(!isMobile);

    const openSearch = () => setisSearch(prev => !prev);

    const openNewGroup = () => {
        setisNewGroup(prev => !prev);
    };

    const openNotification = () => {
        setisNotification(prev => !prev)
    }

    const navigateToGroup = () => navigate("/groups");

    const logoutHandler = () => console.log("logout")
    return (
        <>
            <Box sx={{ flexGrow: 1 }} height={"4rem"}>
                <AppBar
                    position="static"
                    sx={{
                        bgcolor: orange,
                    }}
                >
                    <Toolbar>
                        <Typography
                            variant="h6"
                            sx={{
                                display: { xs: "none", sm: "block" },
                            }}
                        >
                            ChatWave
                        </Typography>

                        <Box
                            sx={{
                                display: { xs: "block", sm: "none" },
                            }}
                        >
                            <IconButton color="inherit" onClick={handleMobile}>
                                <MenuIcon />
                            </IconButton>
                        </Box>
                        <Box
                            sx={{
                                flexGrow: 1,
                            }}
                        />
                        <Box>
                            <IconBtn
                                title={"Search"}
                                icon={<SearchIcon />}
                                onClick={openSearch}
                            />

                            <IconBtn
                                title={"New Group"}
                                icon={<AddIcon />}
                                onClick={openNewGroup}
                            />

                            <IconBtn
                                title={"Manage Groups"}
                                icon={<GroupIcon />}
                                onClick={navigateToGroup}
                            />

                            <IconBtn onClick={openNotification}
                                title={"Notifications"}
                                icon={<NotificationsIcon />}
                            />

                            <IconBtn
                                title={"Logout"}
                                icon={<LogoutIcon />}
                                onClick={logoutHandler}
                            />
                        </Box>
                    </Toolbar>
                </AppBar>
            </Box>
            {
                isSearch && (
                    <Suspense fallback={<Backdrop open />}>
                        <SearchDialog />
                    </Suspense>
                )
            }

            {
                isNotification && (
                    <Suspense fallback={<Backdrop open />}>
                        <NotificationDialog />
                    </Suspense>
                )
            }

            {
                isNewGroup && (
                    <Suspense fallback={<Backdrop open />}>
                        <NewGroupDialog />
                    </Suspense>
                )
            }
        </>
    )
}

const IconBtn = ({ title, icon, onClick, value }) => {
    return (
        <Tooltip title={title}>
            <IconButton color="inherit" size="large" onClick={onClick}>
                {value ? (
                    <Badge badgeContent={value} color="error">
                        {icon}
                    </Badge>
                ) : (
                    icon
                )}
            </IconButton>
        </Tooltip>
    );
};

export default Header