export const idlFactory = ({ IDL }) => {
  const Result = IDL.Variant({ 'ok' : IDL.Text, 'err' : IDL.Text });
  const AssetStatus = IDL.Variant({
    'Open' : IDL.Null,
    'Inactive' : IDL.Null,
    'Active' : IDL.Null,
    'Pending' : IDL.Null,
  });
  const LocationType = IDL.Record({
    'lat' : IDL.Float64,
    'long' : IDL.Float64,
    'details' : IDL.Vec(IDL.Text),
  });
  const DocumentHash = IDL.Record({
    'hash' : IDL.Text,
    'name' : IDL.Text,
    'description' : IDL.Text,
  });
  const AssetType = IDL.Variant({
    'Artwork' : IDL.Null,
    'Business' : IDL.Null,
    'Vehicle' : IDL.Null,
    'Property' : IDL.Null,
    'Equipment' : IDL.Null,
  });
  const Rule = IDL.Record({
    'downPaymentMaturityTime' : IDL.Nat,
    'sellSharing' : IDL.Bool,
    'sellSharingPrice' : IDL.Nat,
    'sellSharingNeedVote' : IDL.Bool,
    'ownerShipMaturityTime' : IDL.Int,
    'downPaymentCashback' : IDL.Float64,
    'details' : IDL.Vec(IDL.Text),
    'paymentMaturityTime' : IDL.Int,
    'minDownPaymentPercentage' : IDL.Float64,
    'needDownPayment' : IDL.Bool,
  });
  const TypeReportEvidence = IDL.Record({
    'evidencecontent' : IDL.Opt(IDL.Text),
    'hashclarity' : IDL.Opt(IDL.Text),
    'footPrintFlow' : IDL.Opt(IDL.Int),
  });
  const ReportType = IDL.Variant({
    'Scam' : IDL.Null,
    'Fraud' : IDL.Null,
    'Plagiarism' : IDL.Null,
    'Legality' : IDL.Null,
    'Bankrupting' : IDL.Null,
  });
  const AssetGuarantee = IDL.Record({
    'content' : IDL.Text,
    'assetid' : IDL.Text,
    'timestamp' : IDL.Int,
    'amount' : IDL.Nat,
  });
  const Asset = IDL.Record({
    'id' : IDL.Text,
    'documentHash' : IDL.Vec(DocumentHash),
    'creator' : IDL.Principal,
    'totalToken' : IDL.Nat,
    'providedToken' : IDL.Nat,
    'name' : IDL.Text,
    'createdAt' : IDL.Int,
    'rule' : Rule,
    'description' : IDL.Text,
    'maxTokenPurchased' : IDL.Nat,
    'updatedAt' : IDL.Int,
    'assetStatus' : AssetStatus,
    'tokenLeft' : IDL.Nat,
    'assetType' : AssetType,
    'pricePerToken' : IDL.Nat,
    'locationInfo' : LocationType,
    'pendingToken' : IDL.Nat,
    'minTokenPurchased' : IDL.Nat,
    'riskScore' : IDL.Float64,
  });
  const AssetSponsorship = IDL.Record({
    'content' : IDL.Text,
    'assetid' : IDL.Text,
    'trustGuatantee' : IDL.Nat,
    'timestamp' : IDL.Int,
  });
  const Ownership = IDL.Record({
    'id' : IDL.Text,
    'purchasePrice' : IDL.Nat,
    'maturityDate' : IDL.Int,
    'purchaseDate' : IDL.Int,
    'owner' : IDL.Principal,
    'tokenOwned' : IDL.Nat,
    'percentage' : IDL.Float64,
  });
  const TransactionType = IDL.Variant({
    'Buy' : IDL.Null,
    'Dividend' : IDL.Null,
    'Downpayment' : IDL.Null,
    'Redeem' : IDL.Null,
    'Sell' : IDL.Null,
    'Extending' : IDL.Null,
    'DownpaymentCashBack' : IDL.Null,
    'Transfer' : IDL.Null,
  });
  const TransactionStatus = IDL.Variant({
    'Failed' : IDL.Null,
    'Completed' : IDL.Null,
    'Pending' : IDL.Null,
  });
  const Transaction = IDL.Record({
    'id' : IDL.Text,
    'to' : IDL.Principal,
    'transactionType' : TransactionType,
    'assetId' : IDL.Text,
    'from' : IDL.Principal,
    'totalPurchasedToken' : IDL.Nat,
    'timestamp' : IDL.Int,
    'details' : IDL.Opt(IDL.Text),
    'pricePerToken' : IDL.Nat,
    'transactionStatus' : TransactionStatus,
    'totalPrice' : IDL.Nat,
  });
  const Report = IDL.Record({
    'id' : IDL.Text,
    'created' : IDL.Int,
    'content' : IDL.Text,
    'description' : IDL.Text,
    'isDone' : IDL.Int,
    'reputation' : IDL.Nat,
    'reportType' : ReportType,
    'evidence' : IDL.Opt(TypeReportEvidence),
    'complainer' : IDL.Principal,
    'isDoneTimeStamp' : IDL.Int,
    'targetid' : IDL.Text,
  });
  const IdentityNumberType = IDL.Variant({
    'IdentityNumber' : IDL.Null,
    'LiscenseNumber' : IDL.Null,
    'Pasport' : IDL.Null,
  });
  const KycStatus = IDL.Variant({
    'Rejected' : IDL.Null,
    'Verivied' : IDL.Null,
    'Pending' : IDL.Null,
  });
  const UserKyc = IDL.Record({ 'status' : KycStatus, 'riskScore' : IDL.Nat });
  const User = IDL.Record({
    'id' : IDL.Text,
    'country' : IDL.Text,
    'timeStamp' : IDL.Int,
    'publickey' : IDL.Text,
    'city' : IDL.Text,
    'userIdentity' : IdentityNumberType,
    'fullName' : IDL.Text,
    'kyc_level' : UserKyc,
    'phone' : IDL.Text,
    'lastName' : IDL.Text,
    'userIDNumber' : IDL.Text,
  });
  const UserOverviewResult = IDL.Record({
    'asset' : IDL.Record({ 'token' : IDL.Int, 'total' : IDL.Int }),
    'ownership' : IDL.Record({ 'token' : IDL.Int, 'total' : IDL.Int }),
    'transaction' : IDL.Record({
      'buy' : IDL.Int,
      'total' : IDL.Int,
      'dividend' : IDL.Int,
      'sell' : IDL.Int,
      'transfer' : IDL.Int,
    }),
    'userIdentity' : User,
  });
  const ProposalResult = IDL.Record({
    'id' : IDL.Text,
    'assetId' : IDL.Text,
    'createdAt' : IDL.Int,
    'downPaymentTimeStamp' : IDL.Int,
    'pricePerToken' : IDL.Nat,
    'downPaymentStatus' : IDL.Bool,
    'totalPrice' : IDL.Nat,
    'amount' : IDL.Nat,
    'voterPercentage' : IDL.Float64,
  });
  return IDL.Service({
    'actionReport' : IDL.Func(
        [IDL.Text, IDL.Text, IDL.Opt(IDL.Text), IDL.Opt(IDL.Text)],
        [Result],
        [],
      ),
    'addNewSponsor' : IDL.Func([IDL.Text, IDL.Text, IDL.Nat], [Result], []),
    'approveBuyProposal' : IDL.Func([IDL.Text], [Result], []),
    'approveInvestorProposal' : IDL.Func([IDL.Text], [Result], []),
    'askAI' : IDL.Func([IDL.Text], [IDL.Text], []),
    'changeAssetStatus' : IDL.Func([IDL.Text, AssetStatus], [Result], []),
    'claimAssetSupport' : IDL.Func([IDL.Text], [Result], []),
    'createAsset' : IDL.Func(
        [
          IDL.Text,
          IDL.Text,
          IDL.Nat,
          IDL.Nat,
          IDL.Nat,
          IDL.Nat,
          IDL.Nat,
          LocationType,
          IDL.Vec(DocumentHash),
          AssetType,
          AssetStatus,
          Rule,
        ],
        [Result],
        [],
      ),
    'createAssetGuarantee' : IDL.Func(
        [IDL.Text, IDL.Text, IDL.Nat],
        [Result],
        [],
      ),
    'createIvestorProposal' : IDL.Func(
        [IDL.Text, IDL.Principal, IDL.Nat, IDL.Nat],
        [Result],
        [],
      ),
    'createReportAsset' : IDL.Func(
        [IDL.Text, IDL.Text, IDL.Text, IDL.Opt(TypeReportEvidence), ReportType],
        [Result],
        [],
      ),
    'distributeDividend' : IDL.Func([IDL.Text, IDL.Nat], [Result], []),
    'finishTheInvitation' : IDL.Func([IDL.Text, IDL.Nat], [Result], []),
    'finishedPayment' : IDL.Func([IDL.Text, IDL.Int], [Result], []),
    'getAllAssetGuarantees' : IDL.Func([], [IDL.Vec(AssetGuarantee)], []),
    'getAllAssets' : IDL.Func([], [IDL.Vec(Asset)], []),
    'getAllSponsor' : IDL.Func([], [IDL.Vec(AssetSponsorship)], []),
    'getAssetById' : IDL.Func([IDL.Text], [IDL.Opt(Asset)], []),
    'getAssetFullDetails' : IDL.Func(
        [IDL.Text],
        [
          IDL.Opt(
            IDL.Record({
              'asset' : Asset,
              'ownerships' : IDL.Vec(Ownership),
              'transactions' : IDL.Vec(Transaction),
              'dividends' : IDL.Vec(Transaction),
            })
          ),
        ],
        [],
      ),
    'getAssetGuarantee' : IDL.Func([IDL.Text], [IDL.Opt(AssetGuarantee)], []),
    'getAssetSignature' : IDL.Func(
        [IDL.Text],
        [IDL.Opt(IDL.Vec(DocumentHash))],
        [],
      ),
    'getAssetTotalCount' : IDL.Func([], [IDL.Nat], []),
    'getAssetbyRange' : IDL.Func([IDL.Nat, IDL.Nat], [IDL.Vec(Asset)], []),
    'getIncome' : IDL.Func([IDL.Text], [IDL.Opt(IDL.Vec(Transaction))], []),
    'getMyAssetReport' : IDL.Func([], [IDL.Vec(Report)], []),
    'getMyAssets' : IDL.Func([], [IDL.Vec(Asset)], []),
    'getMyOwnerShip' : IDL.Func([], [IDL.Vec(Ownership)], []),
    'getMyProfiles' : IDL.Func([], [IDL.Opt(UserOverviewResult)], []),
    'getMyProposal' : IDL.Func([], [IDL.Opt(IDL.Vec(ProposalResult))], []),
    'getProposalbyAssetId' : IDL.Func(
        [IDL.Text],
        [IDL.Opt(IDL.Vec(ProposalResult))],
        [],
      ),
    'getReportById' : IDL.Func([IDL.Text], [IDL.Vec(Report)], []),
    'getSponsorsByAssetId' : IDL.Func(
        [IDL.Text],
        [IDL.Vec(AssetSponsorship)],
        [],
      ),
    'getUserPublicKey' : IDL.Func([IDL.Principal], [IDL.Opt(IDL.Text)], []),
    'getUserPublicSignature' : IDL.Func([], [IDL.Opt(IDL.Text)], []),
    'initializeNewAssetSponsor' : IDL.Func(
        [IDL.Text, IDL.Text, IDL.Nat],
        [Result],
        [],
      ),
    'proceedDownPayment' : IDL.Func([IDL.Nat, IDL.Text], [Result], []),
    'proposedBuyToken' : IDL.Func([IDL.Text, IDL.Nat, IDL.Nat], [Result], []),
    'registUser' : IDL.Func(
        [
          IDL.Text,
          IDL.Text,
          IDL.Text,
          IDL.Text,
          IDL.Text,
          IDL.Text,
          IdentityNumberType,
          IDL.Text,
        ],
        [Result],
        [],
      ),
    'seacrhAsset' : IDL.Func(
        [IDL.Text, IDL.Opt(AssetStatus)],
        [IDL.Opt(Asset)],
        [],
      ),
  });
};
export const init = ({ IDL }) => { return []; };
