<template>
  <div class="body">
    <div class="title">
      <h1>Картины эпохи Возрождения</h1>
    </div>
    <div class="cards">
      <div
        v-for="(card, index) in filteredCards"
        :key="index"
        class="card"
        :class="{ sold: card.sold }"
      >
        <img
          @click="showModal(card)"
          :src="card.image"
          :alt="card.name"
          class="card-img"
        />
        <div class="card-body">
          <h2 @click="showModal(card)">«{{ card.name }}» {{ card.author }}</h2>
          <div v-if="card.price" class="sales-area">
            <div class="prices">
              <span v-if="card['old-price']" class="old-price"
                >{{ card["old-price"] }}$</span
              >
              <span class="price">{{ card.price }}$</span>
            </div>
            <button
              @click="buy(card.name)"
              :disabled="isLoading[card.name]"
              :class="{ purchased: purchased[card.name] }"
            >
              <span v-if="isLoading[card.name]">
                <img src="@/assets/icons/loading.gif" alt="" class="loading" />
              </span>
              <span v-else-if="purchased[card.name]">
                <img src="@/assets/icons/checked.svg" alt="" class="check" />
                В корзине
              </span>
              <span v-else>Купить</span>
            </button>
          </div>
          <div v-else class="sold">Продана на аукционе</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import BirthOfVenus from "../assets/images/Birth of Venus.png";
import BirthOfVenus1 from "../assets/images/Birth of Venus Slider1.jpg";
import BirthOfVenus2 from "../assets/images/Birth of Venus Slider2.jpg";
import BirthOfVenus3 from "../assets/images/Birth of Venus Slider3.jpg";
import TheLastSupper from "../assets/images/The Last Supper.png";
import TheLastSupper2 from "../assets/images/TaynayaVecherja2.jpg";
import TheLastSupper3 from "../assets/images/The Last Supper3.jpg";
import CreationOfAdam from "../assets/images/Creation of Adam.png";
import CreationOfAdam2 from "../assets/images/Creation of Adam2.jpg";
import AnatomyLesson from "../assets/images/anatomy lesson.png";
import AnatomyLesson2 from "../assets/images/AnatomyLesson2.jpg";
import AnatomyLesson3 from "../assets/images/AnatomyLesson3.jpg";
export default {
  components: {},
  data() {
    return {
      cards: [
        {
          name: "Рождение Венеры",
          author: "Сандро Ботичелли",
          image: BirthOfVenus,
          description:
            "Сюжет этой картины основан на мифе о том, как из пены морской появилась на свет богиня любви.",
          price: "1000000",
          sold: false,
          "old-price": "2000000",
          "img-slider": [
            {
              src: BirthOfVenus1,
            },
            {
              src: BirthOfVenus2,
            },
            {
              src: BirthOfVenus3,
            },
          ],
        },
        {
          name: "Тайная вечеря",
          author: "Леонардо Да Винчи",
          image: TheLastSupper,
          description:
            "«Тайная вечеря» — это последний ужин Иисуса со своими учениками-апостолами. Он проходил накануне ареста Христа римлянами.",
          price: "3000000",
          sold: false,
          "old-price": "",
          "img-slider": [
            {
              src: TheLastSupper,
            },
            {
              src: TheLastSupper2,
            },
            {
              src: TheLastSupper3,
            },
          ],
        },
        {
          name: "Сотворение Адама",
          author: "Микеланджело",
          image: CreationOfAdam,
          description:
            "«Сотворение Адама» — одна из самых выдающихся композиций росписи Сикстинской капеллы. В бесконечном пространстве летит Бог-Отец, окружённый бескрылыми ангелами, с реющей белой туникой. Правая рука вытянута навстречу руке Адама и почти касается её.",
          sold: false,
          price: "5000000",
          "old-price": "6000000",
          "img-slider": [
            {
              src: CreationOfAdam,
            },
            {
              src: CreationOfAdam2,
            },
          ],
        },
        {
          name: "Урок анатомии",
          author: "Рембрандт",
          image: AnatomyLesson,
          description:
            " Это был первый крупный заказ, полученный Рембрандтом после переезда в Амстердам. На полотне (1632) запечатлено вскрытие, проведенное доктором Николасом Тульпом. ",
          price: "",
          "old-price": "",
          sold: true,
          "img-slider": [
            {
              src: AnatomyLesson,
            },
            {
              src: AnatomyLesson2,
            },
            {
              src: AnatomyLesson3,
            },
          ],
        },
      ],
      modalWindow: false,
      modalData: {},
      purchased: {},
      isLoading: {},
    };
  },
  props: ["searchedCard"],
  methods: {
    showModal(card) {
      this.$emit("show-modal", card);
    },
    searchCards() {
      return this.cards.filter((card) =>
        card.name.toLowerCase().includes(this.searchedCard.toLowerCase())
      );
    },
    buy(cardName) {
      this.isLoading[cardName] = true;
      this.$forceUpdate();
      if (this.purchased[cardName]) {
        setTimeout(() => {
          this.purchased[cardName] = false;
          this.isLoading[cardName] = false;
          localStorage.setItem("purchased", JSON.stringify(this.purchased));
          this.$forceUpdate();
        }, 2000);
      } else {
        setTimeout(() => {
          this.purchased[cardName] = true;
          this.isLoading[cardName] = false;
          localStorage.setItem("purchased", JSON.stringify(this.purchased));
          this.$forceUpdate();
        }, 2000);
      }
    },
  },
  computed: {
    filteredCards() {
      return this.searchedCard === "" ? this.cards : this.searchCards();
    },
  },
  mounted() {
    if (localStorage.getItem("purchased")) {
      this.purchased = JSON.parse(localStorage.getItem("purchased"));
    }
  },
};
</script>
<style lang="scss">
.body {
  flex: 1 0 auto;
  max-width: 1216px;
  margin: 0 auto;
  padding: 45px 0;
  .title {
  }
  .cards {
    display: flex;
    flex-wrap: wrap;

    margin: 0 -16px;
    .card {
      height: 328px;
      width: 280px;
      margin: 16px;
      border: 1px solid #e1e1e1;
      &-img {
        height: 160px;
        width: 280px;
        cursor: pointer;
      }
      &-body {
        padding: 24px;

        h2 {
          cursor: pointer;
        }
        .sales-area {
          margin-top: 22px;
          display: flex;
          justify-content: space-between;

          .prices {
            display: flex;
            flex-direction: column;
            justify-content: center;
            font-style: normal;
            font-size: 14px;
            line-height: 150%;
            .old-price {
              font-weight: 300;
              text-decoration-line: line-through;
              color: #a0a0a0;
            }
            .price {
              font-weight: 700;
              color: #343030;
            }
          }
          button {
            &:disabled {
              background: #c1b4b1;
            }
            &:hover {
              background: #776763;
            }
          }
          .loading {
            width: 20px;
            height: 20px;
          }
          .purchased {
            background: #5b3a32;
            padding: 14px 10px;

            .check {
              margin-right: 5px;
            }
          }
        }
        .sold {
          font-weight: 700;
          font-size: 16px;
          line-height: 150%;
          color: #343030;

          margin-top: 34px;
        }
      }
    }
  }
  .sold {
    opacity: 0.4;
  }
}
@media (max-width: 1280px) {
  .body {
    max-width: 920px;
  }
}
@media (max-width: 940px) {
  .body {
    max-width: none;
    padding: 0 20px;
    .title {
      margin-top: 20px;
      text-align: center;
    }
    .cards {
      justify-content: center;
    }
  }
}
</style>
