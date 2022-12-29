import { Controller } from "cx/ui";
import { getComparer } from "cx/data";
import casual from "./casual";

export default class PageController extends Controller {
  init() {
    super.init();

    var dataSet = Array.from({ length: 1000 }).map((v, i) => ({
      id: i + 1,
      fullName: casual.full_name,
      phone: casual.phone,
      city: casual.city
    }));

    this.store.init("$page.pageSize", 10);
    this.store.init("$page.filter", { name: null, phone: null, city: null });

    this.addTrigger(
      "page",
      ["$page.pageSize", "$page.sorters", "$page.filter"],
      () => {
        this.store.set("$page.page", 1);
      },
      true
    );

    this.addTrigger(
      "pagination",
      ["$page.pageSize", "$page.page", "$page.sorters", "$page.filter"],
      (size, page, sorters, filter) => {
        setTimeout(() => {
          var filtered = dataSet;
          if (filter) {
            if (filter.name) {
              var checks = filter.name.split(" ").map(w => new RegExp(w, "gi"));
              filtered = filtered.filter(x =>
                checks.every(ex => x.fullName.match(ex))
              );
            }

            if (filter.phone)
              filtered = filtered.filter(
                x => x.phone.indexOf(filter.phone) != -1
              );

            if (filter.city)
              filtered = filtered.filter(
                x => x.city.indexOf(filter.city) != -1
              );
          }
          var compare = getComparer(
            (sorters || []).map(x => ({
              value: { bind: x.field },
              direction: x.direction
            }))
          );
          filtered.sort(compare);
          this.store.set(
            "$page.records",
            filtered.slice((page - 1) * size, page * size)
          );
          this.store.set("$page.pageCount", Math.ceil(filtered.length / size));
        }, 100);
      },
      true
    );
  }
}
