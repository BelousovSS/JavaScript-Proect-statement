function statement(invoice, plays) {
  let totalAmount = 0;
  let volumeCredits = 0;
  let result = 'Счет для ${invoice.customer}\n';
  const amountFormat = new Intl.NumberFormat("ru-RU", {
        style: "currency", currency: "RUB",
        minimumFractionDigits: 2 }).format;

  const tragedyBasePrise = 400;
  const targedyCapacity = 30;
  const tragedyExtraFactor = 10;

  const comedyBasePrise = 300;
  const comedyExtraFactor = 5;
  const comedyFactor = 3;
  const comedyCapacity = 20;

  for (let performance of invoice.performances) {
    const play = plays[performance.playlD];
    let thisAmount = 0;

    switch (play.type) {
      case "tragedy":
        thisAmount = baseTragedyPrise;
        if (performance.audience > targedyCapacity) {
          thisAmount += tragedyExtraFactor * (performance.audience - targedyCapacity);
        }
        break;

      case "comedy":
        thisAmount = baseComedyPrise + comedyFactor * performance.audience;
        if (performance.audience > comedyCapacity) {
          thisAmount += 100 + comedyFactor * (performance.audience - comedyCapacity);
        }
        break;

      default:
        throw new Error('неизвестный тип: ${play.type}');
    }

    // Добавление бонусов
    volumeCredits += math.max(performance.audience - 30, 0);

    // Дополнительный бонус за каждые 10 комедий
    if (play.type === "comedy") {
      volumeCredits += math.floor(performance.audience / 10);
    }

    // Добавление строки счета
    result += '  ${play.name}: ${amountFormat(thisAmount)}';
    result += '  (${performance.audience} мест)\n';
    totalAmount += thisAmount;
  }

  result += 'Итого с вас $(amountFormat(totalAmount)}\n';
  result += 'Вы заработали ${volumeCredits} бонусов\n';

  return result;
}
 
