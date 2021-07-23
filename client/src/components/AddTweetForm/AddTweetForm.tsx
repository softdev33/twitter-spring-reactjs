import React, {FC, ReactElement, useState} from 'react';
import {useLocation} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import {IconButton} from "@material-ui/core";
import {Picker} from 'emoji-mart'
import 'emoji-mart/css/emoji-mart.css'
import {EmojiData} from "emoji-mart";

import {fetchAddTweet, setAddFormState} from "../../store/ducks/tweets/actionCreators";
import {selectIsTweetsLoading} from "../../store/ducks/tweets/selectors";
import {AddFormState, Image} from '../../store/ducks/tweets/contracts/state';
import UploadImages from '../UploadImages/UploadImages';
import {uploadImage} from "../../util/uploadImage";
import {selectUserData} from "../../store/ducks/user/selectors";
import {fetchReplyTweet, setTweetLoadingState} from "../../store/ducks/tweet/actionCreators";
import {useAddTweetFormStyles} from "./AddTweetFormStyles";
import {DEFAULT_PROFILE_IMG} from "../../util/url";
import {CloseIcon, EmojiIcon, GifIcon, PullIcon, ScheduleIcon} from "../../icons";
import {selectIsTweetLoading} from "../../store/ducks/tweet/selectors";
import {LoadingStatus} from "../../store/types";

interface AddTweetFormProps {
    maxRows?: number;
    minRows?: number;
    tweetId?: string;
    title: string;
    buttonName: string;
    addressedUsername?: string;
    addressedId?: number;
}

export interface ImageObj {
    src: string;
    file: File;
}

const MAX_LENGTH = 280;

export const AddTweetForm: FC<AddTweetFormProps> = ({
                                                        maxRows,
                                                        minRows,
                                                        tweetId,
                                                        title,
                                                        buttonName,
                                                        addressedUsername,
                                                        addressedId
                                                    }: AddTweetFormProps): ReactElement => {
    const classes = useAddTweetFormStyles();
    const dispatch = useDispatch();
    const location = useLocation();
    const isTweetsLoading = useSelector(selectIsTweetsLoading);
    const isReplyLoading = useSelector(selectIsTweetLoading);
    const userData = useSelector(selectUserData);
    const [text, setText] = useState<string>('');
    const [images, setImages] = useState<ImageObj[]>([]);
    const isModal = location.pathname.includes("/modal");
    const textLimitPercent = Math.round((text.length / 280) * 100);
    const textCount = MAX_LENGTH - text.length;

    const handleChangeTextarea = (e: React.FormEvent<HTMLTextAreaElement>): void => {
        if (e.currentTarget) {
            setText(e.currentTarget.value);
        }
    };

    const addEmoji = (emoji: EmojiData): void => {
        setText((text + " " + emoji.colons).trim());
    };

    const handleClickAddTweet = async (): Promise<void> => {
        let result: Array<Image> = [];
        dispatch(setAddFormState(AddFormState.LOADING));
        for (let i = 0; i < images.length; i++) {
            const file: File = images[i].file;
            const image: Image = await uploadImage(file);
            result.push(image);
        }

        dispatch(fetchAddTweet({
            text: parseHashtags(text), images: result, likes: [], retweets: []
        }));
        setText('');
        setImages([]);
    };

    const handleClickReplyTweet = async (): Promise<void>  => {
        let result: Array<Image> = [];
        dispatch(setTweetLoadingState(LoadingStatus.LOADING));
        for (let i = 0; i < images.length; i++) {
            const file: File = images[i].file;
            const image: Image = await uploadImage(file);
            result.push(image);
        }

        if (addressedUsername && addressedId) {
            dispatch(fetchReplyTweet({
                id: tweetId!, text: parseHashtags(text), addressedUsername, addressedId, images: result, likes: [], retweets: []
            }));
            setText("");
            setImages([]);
        }
    };

    const parseHashtags = (text: string): string => {
        return text.replace(/(#\w+)\b/ig, (hashtag) => `<b id="hashtag">${hashtag}</b>`);
    };

    const removeImage = (): void => {
        setImages((prev) => prev.filter((obj) => obj.src !== images[0].src));
    };

    return (
        <div>
            <div className={classes.content}>
                <Avatar
                    className={classes.contentAvatar}
                    alt={`avatar ${userData?.user.id}`}
                    src={userData?.user.avatar?.src ? userData?.user.avatar?.src : DEFAULT_PROFILE_IMG}
                />
                <TextareaAutosize
                    onChange={handleChangeTextarea}
                    className={classes.contentTextarea}
                    placeholder={title}
                    value={text}
                    rowsMax={maxRows}
                    rowsMin={minRows}
                />
            </div>
            {(images.length !== 0) && (
                <div className={(location.pathname.includes("/modal")) ? classes.imageSmall : classes.image}>
                    <img src={images[0].src} alt={images[0].src}/>
                    <IconButton onClick={removeImage} className={classes.imageRemove}>
                        {CloseIcon}
                    </IconButton>
                </div>)
            }
            <div className={classes.footer}>
                <div className={classes.footerWrapper}>
                    <UploadImages onChangeImages={setImages}/>
                    <div className={classes.footerImage}>
                        <IconButton color="primary">
                            <span>{GifIcon}</span>
                        </IconButton>
                    </div>
                    {(!isModal) && (
                        <div className={classes.footerImage}>
                            <IconButton color="primary">
                                <span>{PullIcon}</span>
                            </IconButton>
                        </div>)
                    }
                    <div className={classes.footerImage}>
                        <IconButton color="primary">
                            <span>{EmojiIcon}</span>
                        </IconButton>
                    </div>
                    {(!isModal)&& (
                        <div className={classes.footerImage}>
                            <IconButton color="primary">
                                <span>{ScheduleIcon}</span>
                            </IconButton>
                        </div>)
                    }
                </div>
                <div className={classes.footerAddForm}>
                    {text && (
                        <>
                            <span>{textCount}</span>
                            <div className={classes.footerAddFormCircleProgress}>
                                <CircularProgress
                                    variant="static"
                                    size={20}
                                    thickness={5}
                                    value={text.length >= MAX_LENGTH ? 100 : textLimitPercent}
                                    style={text.length >= MAX_LENGTH ? {color: 'red'} : undefined}
                                />
                                <CircularProgress
                                    style={{color: 'rgba(0, 0, 0, 0.1)'}}
                                    variant="static"
                                    size={20}
                                    thickness={5}
                                    value={100}
                                />
                            </div>
                        </>
                    )}
                    <Button
                        onClick={buttonName === "Tweet" ? handleClickAddTweet : handleClickReplyTweet}
                        disabled={isTweetsLoading || isReplyLoading || !text || text.length >= MAX_LENGTH}
                        color="primary"
                        variant="contained">
                        {isTweetsLoading || isReplyLoading ? (
                            <CircularProgress color="inherit" size={16}/>
                        ) : (
                            buttonName
                        )}
                    </Button>
                    {/*<Picker onSelect={emojiTag => addEmoji(emojiTag)} set={"twitter"} />*/}
                </div>
            </div>
        </div>
    );
};
