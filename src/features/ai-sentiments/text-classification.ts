// @see https://github.com/hans00/react-native-transformers-example/blob/main/DEVELOPMENT.md
// import { pipeline } from '@xenova/transformers';
import { env, pipeline, TextClassificationPipeline } from '@fugood/transformers';
import { storage, StorageKey } from '~/utils/storage';
import { PROGRESS_STATUS_READY, ProgressCallback } from '../ai-commons/transformer.types';

// The model is fine-tuned specifically for sentiment analysis, meaning it can predict the
// sentiment of a given text (e.g., positive, negative, or neutral).
// It is particularly useful for tasks like customer feedback analysis, social media monitoring, and
// review classification.
const DEFAULT_MODEL_NAME = 'Xenova/bert-base-multilingual-uncased-sentiment';

export type ScoreLabel = {
  score: number;
  label: string;
};

export type AugmentedScoreLabel = ScoreLabel & {
  verboseLabel: string;
  percent: number;
};

const canUseOfflineMode = (): boolean =>
  storage.getBoolean(StorageKey.SENTIMENT_MODEL_AVAILABLE_OFFLINE) ?? false;

const updateCanUseOfflineMode = (value = true): void =>
  storage.set(StorageKey.SENTIMENT_MODEL_AVAILABLE_OFFLINE, value);

/**
 * This class uses the Singleton pattern to ensure that only one instance of the
 * pipeline is loaded. This is because loading the pipeline is an expensive
 * operation and we don't want to do it every time we want to use LLM models.
 */
export class SentimentAnalyser {
  static instance: SentimentAnalyser | null = null;

  private sentimentAnalysisPipeline?: TextClassificationPipeline;

  private constructor() {}

  get isReady(): boolean {
    return !!this.sentimentAnalysisPipeline;
  }

  static isInstanceReady(): boolean {
    return !!this.instance?.isReady;
  }

  static async getInstance(progressHandler?: ProgressCallback) {
    if (this.instance?.isReady) {
      progressHandler?.(PROGRESS_STATUS_READY);
      return this.instance;
    }

    console.info('===> env', JSON.stringify(env, null, 2));

    this.instance = new SentimentAnalyser();
    this.instance.sentimentAnalysisPipeline = await pipeline(
      'sentiment-analysis',
      DEFAULT_MODEL_NAME,
      {
        progress_callback: progressHandler,
        local_files_only: canUseOfflineMode(),
        dtype: 'fp16',
        device: 'auto',
      }
    );

    updateCanUseOfflineMode();

    return this.instance;
  }

  async analyse(texts: string[]): Promise<AugmentedScoreLabel[]> {
    if (!this.sentimentAnalysisPipeline) {
      throw new Error('Model is not loaded yet');
    }

    const results = (await this.sentimentAnalysisPipeline(texts)) as unknown as ScoreLabel[];
    return results.map((result) => ({
      ...result,
      verboseLabel: `${result.label} (score: ${result.score?.toFixed(2)})`,
      percent: +result.label.split(' ')[0] / 5,
    }));
  }
}

export const MULTI_LANG_FOOD_RATING = [
  'I love transformers!',
  'I hate this food, not good at all!',
  'Ce plat était délicieux et le service était excellent!',
  'Ce plat était délicieux et le service excellent. Même si le prix est un peu élevé, ca en vallait la peine!',
];

export const FRENCH_INSPECTION_REPORT = [
  "L'inspection de l'entrée de la mine révèle un état critique des infrastructures. Les portes en acier inox, censées garantir la sécurité et la protection de l'accès, sont gravement endommagées. Une des portes est complètement rouillée et hors d'usage, laissant l'accès non sécurisé. Le système de verrouillage est défectueux et plusieurs charnières sont cassées, rendant impossible une fermeture hermétique. De plus, des débris et des accumulations de boue obstruent l'entrée, compliquant l'accès des travailleurs et des équipements. Ces conditions représentent un danger immédiat, tant pour la sécurité des personnes que pour la continuité des activités minières. Une intervention rapide et complète est impérative.",
  "Suite à une inspection approfondie, l'état général du hangar est jugé préoccupant. La structure principale montre des signes avancés de corrosion au niveau des poutres métalliques, principalement dues à une exposition prolongée à des conditions climatiques humides et à l'absence de traitement protecteur. Le système de ventilation est également défectueux, entraînant une accumulation d'humidité qui aggrave la dégradation. De plus, certaines parties de la toiture sont endommagées, permettant des infiltrations d'eau. Ces problèmes représentent un risque pour la sécurité des employés et des équipements, nécessitant des travaux de réparation urgents pour éviter des dommages plus importants.",
  "L'inspection du barrage de rivière, mesurant 500 mètres de hauteur et 300 mètres de largeur, révèle qu'il est dans un bon état général. La structure principale est solide et bien entretenue, avec seulement quelques petites fissures superficielles au niveau des joints qui ne compromettent pas la sécurité globale. Les systèmes de drainage et les vannes de régulation fonctionnent correctement, bien que des améliorations mineures soient nécessaires pour optimiser leur efficacité. Une attention particulière devra être accordée à la surveillance régulière de ces fissures pour prévenir d'éventuels problèmes à long terme. Aucune menace immédiate n'a été détectée pour les populations en aval.",
];
