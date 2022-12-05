
import emojiRegex from 'emoji-regex'
import { Emoji, EmojiStyle } from "emoji-picker-react";
import { GetEmojiUrl } from "emoji-picker-react/dist/components/emoji/Emoji";
import makeStyles from "@material-ui/core/styles/makeStyles";

const useStyles = makeStyles(theme => ({
    emojiWrapper: {
        '& .__EmojiPicker__.epr-emoji-img': {
            verticalAlign: 'middle',
            height: `${theme.typography.fontSize * 1.4}px !important`,
            width: `${theme.typography.fontSize * 1.4}px !important`
        }
    }
}));

type props = {
    unified: string;
    emojiStyle?: EmojiStyle;
    size?: number;
    lazyLoad?: boolean;
    getEmojiUrl?: GetEmojiUrl;
}

export default function EmojiWrapper(props: props){
    const classes = useStyles();
    return <span className={classes.emojiWrapper}><Emoji {...props}/></span>
}

const emojiRegexVal = emojiRegex()
const emojiRegexInclude = new RegExp( '(' + emojiRegexVal.source + ')')

export function emojiUnicode (emoji: string) {
    var comp;
    if (emoji.length === 1) {
        comp = emoji.charCodeAt(0);
    }
    comp = (
        (emoji.charCodeAt(0) - 0xD800) * 0x400
      + (emoji.charCodeAt(1) - 0xDC00) + 0x10000
    );
    if (comp < 0) {
        comp = emoji.charCodeAt(0);
    }
    return comp.toString(16);
};

export function parseTextWithEmojis(text: string){
    return text.split(emojiRegexInclude).map((e => {
        if(emojiRegexVal.test(e))
            return <EmojiWrapper emojiStyle={EmojiStyle.GOOGLE} unified={emojiUnicode(e)}/>
        return e
    }))
}
