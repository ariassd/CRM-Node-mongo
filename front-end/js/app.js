let __NEW_COMPANY__ = "New company";

angular
  .module("ERM", []) //video #12
  .factory("companyService", [
    "$http",
    function ($http) {
      function get(id) {
        return $http
          .get(`/api/company/${id}`)
          .catch((err) => console.log(err.toString()));
      }

      function getAllCompanies() {
        return $http
          .get("/api/company/")
          .catch((err) => console.log(err.toString()));
      }

      function saveCompany(emp) {
        return $http
          .put(`/api/company/${emp._id}`, emp)
          .catch((err) => console.log(err.toString()));
      }

      function saveNewCompany(emp) {
        return $http
          .post(`/api/company`, emp)
          .catch((err) => console.log(err.toString()));
      }

      function deleteCompany(id) {
        return $http
          .delete(`/api/company/${id}`)
          .catch((err) => console.log(err.toString()));
      }

      return {
        get,
        getAllCompanies,
        saveCompany,
        saveNewCompany,
        deleteCompany,
      }; //video #13
    },
  ])
  .controller("MainController", [
    "$scope",
    "companyService",
    function ($scope, companyService) {
      companyService
        .getAllCompanies()
        .then((res) => ($scope.company = res.data));
      $scope.companyCardClick = (company) =>
        companyCardClick($scope, companyService, company); //video #10
      $scope.clearCompanyForm = () => clearCompanyForm($scope);
      $scope.company = [];
      $scope.currentCompany = {};
      $scope.searchText = "";

      $scope.saveCurrentCompany = () =>
        saveCompany($scope, companyService, $scope.currentCompany);
      $scope.deleteCurrentCompany = () => deleteCompany(companyService, $scope);
      $scope.startNewCompanyCreation = () => startNewCompanyCreation($scope);
      $scope.copyCurrentCompany = () =>
        copyCurrentCompany($scope, companyService);
      $scope.filteredCompanies = () => filterResults($scope);

      $scope.pageTitle = __NEW_COMPANY__;
      if ($scope.currentCompany.name)
        $scope.pageTitle = $scope.currentCompany.name;
    },
  ]);

function companyCardClick($scope, companyService, company) {
  console.log(company);
  if (company._id) {
    companyService.get(company._id).then((res) => {
      console.log(res);
      // $scope.company = $scope.company.filter((e1) => e1 != emp);
      $scope.currentCompany = res.data;
      if ($scope.currentCompany.name)
        $scope.pageTitle = $scope.currentCompany.name;
    });
  }
}

function deleteCompany(companyService, $scope) {
  var emp = $scope.currentCompany;
  if (emp._id) {
    companyService.deleteCompany(emp._id).then((res) => {
      $scope.company = $scope.company.filter((e1) => e1 != emp);
    });
  }
  $scope.currentCompany = {};
}

function saveCompany($scope, companyService, company) {
  if (company._id)
    companyService.saveCompany(company).then((res) => {
      console.log("res", res.data);
      const index = $scope.company.findIndex((e1) => e1._id === company._id);
      console.log(index);
      console.log("at index", $scope.company[index]);
      $scope.company[index] = res.data;
    });
  else
    companyService.saveNewCompany(company).then((res) => {
      $scope.company.push(res.data);
    });
}

function startNewCompanyCreation($scope) {
  clearCompanyForm($scope);
  $scope.currentCompany = {
    new: true,
  };
}

function copyCurrentCompany($scope, companyService) {
  let newFromCopy = Object.assign({}, $scope.currentCompany);
  delete newFromCopy._id;
  newFromCopy.name = `Copy of ${newFromCopy.name}`;
  companyService.saveNewCompany(newFromCopy).then((res) => {
    $scope.company.push(res.data);
  });
}

function filterResults($scope) {
  let { searchText, company } = $scope;
  return company.filter(
    (e) => e.name.toLowerCase().indexOf(searchText.toLowerCase()) > -1
  );
}

function clearCompanyForm($scope) {
  $scope.pageTitle = __NEW_COMPANY__;
  $scope.currentCompany = {};
}
