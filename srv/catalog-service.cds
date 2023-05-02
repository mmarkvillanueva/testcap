using {testcap.db as db} from '../db/data-model';
















service CatalogService @(path : '/catalog')
{
    entity Sales
      as select * from db.Sales
      actions {
        action boost() returns Sales;
      }
    ;



















};