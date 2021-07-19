import AsyncStorage from '@react-native-async-storage/async-storage';
import { defaultTrigger } from '../utils/consts';
import { Phrase, TimeTrigger } from '../utils/interfaces';
import { compareTodayvsDate } from '../utils/utils';
import { getDict } from './yearlyDicts';

export default class Database {

    timeTriggerName = "timeTrigger";
    ssnName = "shouldSendNotifications";
    phrasesName = "phrases";
    tables = [this.timeTriggerName, this.ssnName, this.phrasesName]

    storeYearlyPhrases = async (): Promise<void> =>
        await AsyncStorage.setItem(this.phrasesName, JSON.stringify(getDict()));

    getShouldSendNotifications = async (): Promise<boolean> => {
        const ssn = await AsyncStorage.getItem(this.ssnName);
        return ssn ? JSON.parse(ssn) : true;
    }

    setShouldSendNotifications = async (value: boolean | number): Promise<void> =>
        await AsyncStorage.setItem(this.ssnName, JSON.stringify(value))

    getTimeTrigger = async (): Promise<TimeTrigger> => {
        try {
            const datrig = await AsyncStorage.getItem(this.timeTriggerName)
            if (datrig !== null) {
                const parsed = JSON.parse(datrig);
                return {
                    hour: parseInt(parsed.hour),
                    minute: parseInt(parsed.minute)
                }
            }
            else return defaultTrigger;
        }
        catch (e) {
            console.error(e);
            return null;
        }
    }

    setTimeTrigger = async (value: TimeTrigger): Promise<void> =>
        await AsyncStorage.setItem(this.timeTriggerName, JSON.stringify(value))

    /*
    getUserDefinedLanguage = async (): Promise<string> =>
        await AsyncStorage.getItem();

    setUserDefinedLanguage = async (value: 'en' | 'es'): Promise<void> =>
        await AsyncStorage.setItem("userDefinedLanguage", value);
    */

    getAllPhrases = async (): Promise<Phrase[]> =>
        JSON.parse(await AsyncStorage.getItem(this.phrasesName));

    getDailyPhrase = async (): Promise<Phrase> => {
        const phrases = await this.getAllPhrases();
        for (const phrase of phrases)
            if (compareTodayvsDate(phrase.date))
                return phrase;
    }

    clear = async (): Promise<void> =>
        await AsyncStorage.multiRemove(this.tables);
}